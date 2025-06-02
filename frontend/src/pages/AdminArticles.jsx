import { useState } from "react";
import api from "../api";

const AdminArticles = () => {
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
        data.append("image", image);

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

    return (
        <div className="max-w-2xl mx-auto mt-[48px] px-[16px]">
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
                    value={formData.image}
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
        </div>
    );
};

export default AdminArticles;