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

        if(!formData.title || !formData.bodyText || !formData.image) {
            setError("Tittel, bilde og brødtekst er påkrevd.")    
        }

        try {
            await api.post("/articles", formData);
            setSuccess("Artikkel opprettet.");
            setFormData({title: "", intro: "", bodyText: "", image: ""});
        } catch (err) {
            setError("Kunne ikke opprette")
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-[48px] px-[16px]">
            <h2 className="text-2xl font-bold mb-[24px] text-center">Ny artikkel</h2>
            
            {error && <p className="text-red-600 mb-[16px]">{error}</p>}
            {success && <p className="text-green-600 mb-[16px]">{success}</p>}

            

        </div>
    )
}