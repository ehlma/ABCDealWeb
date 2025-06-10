import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const AdminArticles = () => {
    const [articles, setArticles] = useState([]);

    const [formData, setFormData] = useState ({
        title: "",
        intro: "",
        bodyText: "",
        images: [],
    });

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
      
        if (!formData.title || !formData.bodyText) {
          setError("Tittel og brødtekst er påkrevd.");
          return;
        }
      
        const data = new FormData();
        data.append("title", formData.title);
        data.append("intro", formData.intro);
        data.append("bodyText", formData.bodyText);
        for (let [key, value] of data.entries()) {
            console.log(`${key}:`, value);
        }
      
        // Legg til alle nye bilder
        selectedFiles.forEach((file) => {
          data.append("images", file);
        });
      
        try {
          await api.post("/articles", data, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          setSuccess("Artikkelen ble oppdatert!");
          setTimeout(() => navigate("/admin/articles"), 1500);
        } catch (err) {
          setError("Noe gikk galt ved oppdatering.");
        }
    };


    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await api.get("/articles");
                setArticles(res.data);
                console.log("Artikler hentet:", res.data);
            } catch (err) {
                console.error("Kunne ikke hente artikler", err)
            }
        };
        fetchArticles();

    }, []);
    
    const handleDelete = async (id) => {
        try {
            await api.delete(`/articles/${id}`);
            setArticles(articles.filter(article => article._id !== id));
          } catch (err) {
            console.error("Kunne ikke slette artikkel", err);
            setError("Kunne ikke slette artikkel");
          }
    };

    return (
        <div className="max-w-2xl mx-auto mt-[32px] px-[16px]">
            <h2 className="text-2xl font-bold mb-[24px] text-center">Ny artikkel</h2>
            
            {error && <p className="text-red-600 mb-[16px]">{error}</p>}
            {success && <p className="text-green-600 mb-[16px]">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-[16px]">
                <input
                    name="title"
                    type="text"
                    placeholder="Tittel*"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-[12px] py-[8px]"
                    required
                />
                <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={(e) => 
                        setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files)])
                    }

                    className="w-full border border-gray-300 rounded px-[12px] py-[8px]"
                    required
                />

                {selectedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-2">
                        {selectedFiles.map((file, idx) => (
                            <img
                                key={idx}
                                src={URL.createObjectURL(file)}
                                alt={`Forhåndsvisning ${idx}`}
                                className="w-full max-w-[100px] mb-2"
                            />
                        ))}
                    </div>
                )}

                <textarea
                    name="intro"
                    placeholder="Introduksjonstekst"
                    value={formData.intro}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-[12px] py-[8px]"
                    rows={3}
                />
                <textarea
                    name="bodyText"
                    placeholder="Brødtekst*"
                    value={formData.bodyText}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-[12px] py-[8px]"
                    rows={8}
                    required
                />

                <button 
                    type="submit"
                    className="mt-[8px] bg-blue-100 font-medium py-[8px] px-[16px] rounded hover:bg-blue-200"
                >
                    Opprett artikkel
                </button>
            </form>

            <div className="mt-[48px]">
                <h3 className="text-xl mb-[16px]">Publiserte artikler</h3>
                <ul className="space-y-[16px]">
                    {articles.map((article) => (
                        <li key={article._id} className="p-[16px] bg-white shadow rounded">
                            <h4 className="text-lg font-semibold">{article.title}</h4>
                            <p className="text-sm text-gray-600 mb-[8px]">{article.createdAt?.slice(0,10)}</p>
                            {article.image && (
                                <img
                                    src={`http://localhost:5050/uploads/${article.image}`}
                                    alt={article.title}
                                    className="w-full max-h-[100px] object-cover mb-4 rounded"
                                />
                            )}

                            {article.images?.map((img, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:5050/uploads/${img}`}
                                    alt={`Bilde ${index + 1}`}
                                    className="w-full max-w-[200px] mb-2"
                                />
                            ))}

                            <p>{article.intro || article.bodyText?.slice(0,100) + "...."}</p>


                            <button 
                                onClick={() => navigate(`/admin/articles/edit/${article._id}`)}
                                className="text-sm text-blue-600 hover:underline mr-4"
                            >
                                Rediger
                            </button>
                            <button
                                onClick={() => handleDelete(article._id)}
                                className="text-sm text-red-600 hover:underline mt-2"
                            >
                                Slett
                            </button>

                        </li>

                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminArticles;