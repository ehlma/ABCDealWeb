import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const EditArticle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);


    const [formData, setFormData] = useState({
        title: "",
        intro: "",
        bodyText: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await api.get(`/articles/${id}`);
                setFormData({
                    title: res.data.title,
                    intro: res.data.intro,
                    bodyText: res.data.bodyText,
                    images: res.data.images || [], 
                });
            } catch (err) {
                setError("Kunne ikke hente artikkel");
            }
        };

        fetchArticle();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const data = new FormData();
        data.append("title", formData.title);
        data.append("intro", formData.intro);
        data.append("bodyText", formData.bodyText);
        if (selectedFile) {
            data.append("image", selectedFile);
        }

        try {
            await api.put(`/articles/${id}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setSuccess("Artikkelen ble oppdatert!");
            setTimeout(() => navigate("/admin/articles"), 1500);
        } catch (err) {
            setError("Noe gikk galt");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Rediger artikkel</h2>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            {success && <p className="text-green-600 mb-2">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {formData.image && (
                    <img
                        src={`http://localhost:5050/uploads/${formData.image}`}
                        alt="Nåværende bilde"
                        className="w-full max-w-[200px] mb-4"
                    />
                )}

                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Tittel"
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <textarea
                    name="intro"
                    value={formData.intro}
                    onChange={handleChange}
                    placeholder="Introduksjon"
                    rows={3}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <textarea
                    name="bodyText"
                    value={formData.bodyText}
                    onChange={handleChange}
                    placeholder="Brødtekst"
                    rows={6}
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    className="w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Oppdater
                </button>
            </form>
        </div>
    );
};

export default EditArticle;
