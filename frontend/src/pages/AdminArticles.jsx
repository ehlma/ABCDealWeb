import { useEffect, useState } from "react";
import api from "../api";

const AdminArticles = () => {
    const [articles, setArticles] = useState([]);

    const [formData, setFormData] = useState ({
        title: "",
        intro: "",
        bodyText: "",
        image: "",
    });

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault(),
        setSuccess("");
        setError("");

        const {title, intro, bodyText, image} = formData;

        if(!formData.title || !formData.bodyText || !formData.image) {
            setError("Tittel, bilde og brødtekst er påkrevd.");
            return;

        }

        const data = new FormData();
        data.append("title", title);
        data.append("intro", intro);
        data.append("bodyText", bodyText);
        data.append("image", formData.image);

        try {
            await api.post("/articles", data, {
                headers: {"Content-Type": "multipart/form-data"},
            });
            setSuccess("Artikkel opprettet!");
            setFormData({title: "", intro: "", bodyText: "", image: null});
        } catch (err) {
            setError("Kunne ikke opprette artikkel.")
        }
    };

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await api.get("/articles");
                setArticles(res.data);

            } catch (err) {
                console.error("Kunne ikke hente artikler", err)
            }
        };
        fetchArticles();

    }, []);

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
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, image: e.target.files[0] })}
                    className="w-full border border-gray-300 rounded px-[12px] py-[8px]"
                    required
                />
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
                    value={formData.body}
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
                            <p>{article.intro || article.bodyText?.slice(0,100) + "...."}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminArticles;