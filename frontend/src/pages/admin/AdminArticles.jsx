import { useEffect, useState } from "react";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";

const AdminArticles = () => {
    const [articles, setArticles] = useState([]);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState ({
        title: "",
        intro: "",
        bodyText: "",
        images: [],
    });

    // Endre artikkel
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    // Opprette artikkel
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
      
        if (!formData.title || !formData.bodyText) {
            setError("Tittel og brødtekst er påkrevd.");
            return;
        }
      
        try {
            // Last opp bildene til Cloudinary
            const imageUploads = await Promise.all(
                selectedFiles.map(async (file) => {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "article_uploads"); 
                const res = await fetch("https://api.cloudinary.com/v1_1/dzsgd5dnu/image/upload", {
                    method: "POST",
                    body: data,
                });
                const result = await res.json();
                return result.secure_url;
            })
        );
      
        const payload = {
            title: formData.title,
            bodyText: formData.bodyText,
        };

        if (formData.intro) payload.intro = formData.intro;
        if (imageUploads.length > 0) payload.images = imageUploads;

        await api.post("/articles", payload);
        setSuccess("Artikkelen ble opprettet!");
        
        setFormData({
            title: "",
            intro: "",
            bodyText: "",
            images: [],
        });
        setSelectedFiles([]);

        setTimeout(() => navigate("/admin/articles"), 1000);
        } catch (err) {
            console.error("Feil:", err);
            setError("Noe gikk galt ved opprettelse.");
        }
    };

    // Hente artikler
    const fetchArticles = async () => {
        try {
            const res = await api.get("/articles");
            setArticles(res.data);
        } catch (err) {
            console.error("Kunne ikke hente artikler", err);
        }
    };
      
    useEffect(() => {
        fetchArticles();
    }, [])

    // Slette artikkel
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
        <div className="w-full max-w-6xl mx-auto mt-[32px] px-[16px]">
    
            {/* Ny artikkel + informasjonstekst */}
            <div className="bg-warm-off-white shadow-md rounded p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Skjema */}
                <form onSubmit={handleSubmit} className="space-y-[16px]">
                    <h2 className="text-2xl font-bold mb-[24px] text-ui-background">Ny artikkel</h2>
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
                        className="bg-white w-full border border-gray-300 rounded px-[12px] py-[8px]"
                        required
                    />
    
                    {selectedFiles.length > 0 && (
                        <div className="flex flex-wrap gap-4 mt-2">
                            {selectedFiles.map((file, idx) => (
                                <img
                                    key={idx}
                                    src={URL.createObjectURL(file)}
                                    alt={`Forhåndsvisning ${idx}`}
                                    className="w-auto h-[100px] mb-2"
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
                        className="mt-[8px] bg-ui-background text-white font-medium py-[8px] px-[16px] rounded hover:bg-blue-400 hover:scale-105"
                    >
                        Opprett artikkel
                    </button>
                    {error && <p className="text-red-600 mb-[16px]">{error}</p>}
                    {success && <p className="text-green-600 mb-[16px]">{success}</p>}
                </form>
                {/* Informasjonstekst */}
                <div className="text-gray-700 text-md mt-20 leading-relaxed text-start">
                    <h3 className="text-lg font-semibold mb-2 text-ui-background">Publisering av artikler</h3>
                    <p className="mb-8">
                        Her kan du publisere artikler som vil vises på hjemmesiden under 
                        <span className="font-semibold"> "Aktuelt"-seksjonen</span>. 
                        Artiklene kan brukes til å dele nyheter, oppdateringer, råd eller informasjon 
                        som kan være nyttig for kundene dine.
                    </p>

                    <h4 className="text-md font-semibold mb-2 text-ui-background">Tips til publisering</h4>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Bruk en tydelig og beskrivende tittel</li>
                        <li>Last opp minst ett bilde (helst i liggende format)</li>
                        <li>Skriv en kort introduksjon for å fange leserens interesse</li>
                        <li>Bruk brødteksten til å utdype innholdet</li>
                        <li>Hold språket enkelt og lett å lese</li>
                    </ul>
                </div>
            </div>
    
            {/* Publiserte artikler */}
            <div className="mt-[64px]">
                <h2 className="text-2xl px-4 text-left mb-[20px] text-ui-background font-bold">Publiserte artikler</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {articles.map((article) => (
                        <div
                            key={article._id}
                            className="p-[16px] bg-warm-off-white shadow-md rounded"
                        >
                            <h4 className="text-lg font-semibold">{article.title}</h4>
                            <p className="text-sm text-gray-600 mb-4">
                                {article.createdAt?.slice(0, 10)}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                {article.images?.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Bilde ${index + 1}`}
                                        className={`w-full h-[150px] object-cover rounded ${
                                            index > 0 ? "hidden md:block" : ""
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className="font-light mb-4">
                                {article.intro || article.bodyText?.slice(0, 100) + "...."}
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => navigate(`/admin/articles/edit/${article._id}`)}
                                    className="text-sm text-warm-off-white bg-ui-background hover:underline"
                                >
                                    Rediger
                                </button>
                                <button
                                    onClick={() => handleDelete(article._id)}
                                    className="text-sm text-warm-off-white bg-red-900 hover:underline"
                                >
                                    Slett
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    
};

export default AdminArticles;
