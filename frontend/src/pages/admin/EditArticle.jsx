import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/api";
import "./EditArticle.css";

const EditArticle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        intro: "",
        bodyText: "",
        images: [],
    });

    const stripHtml = (html = "") => {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    };

    useEffect(() => {
        const fetchArticle = async () => {
            setIsLoading(true);
            setError("");

            try {
                const res = await api.get(`/articles/${id}`);

                setFormData({
                    title: res.data.title || "",
                    intro: res.data.intro || "",
                    bodyText: stripHtml(res.data.bodyText || ""),
                    images: res.data.images || [],
                });
            } catch (err) {
                console.error("Kunne ikke hente artikkel:", err);
                setError("Kunne ikke hente artikkelen.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setSelectedFiles((prev) => [
            ...prev,
            ...Array.from(e.target.files),
        ]);
    };

    const handleRemoveSelectedImage = (indexToRemove) => {
        setSelectedFiles((prev) =>
            prev.filter((_, index) => index !== indexToRemove)
        );

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleRemoveExistingImage = (indexToRemove) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setIsSaving(true);

        if (!formData.title || !formData.bodyText) {
            setError("Tittel og brødtekst er påkrevd.");
            setIsSaving(false);
            return;
        }

        try {
            const imageUploads = await Promise.all(
                selectedFiles.map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "article_uploads");

                    const res = await fetch(
                        "https://api.cloudinary.com/v1_1/dzsgd5dnu/image/upload",
                        {
                            method: "POST",
                            body: data,
                        }
                    );

                    const result = await res.json();

                    if (!res.ok || !result.secure_url) {
                        throw new Error("Bildeopplasting feilet.");
                    }

                    return result.secure_url;
                })
            );

            const payload = {
                title: formData.title,
                intro: formData.intro,
                bodyText: formData.bodyText,
                images:
                    imageUploads.length > 0
                        ? [...formData.images, ...imageUploads]
                        : formData.images,
            };

            await api.put(`/articles/${id}`, payload);

            setSuccess("Artikkelen ble oppdatert!");
            setSelectedFiles([]);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            setTimeout(() => {
                navigate("/admin/articles");
            }, 1200);
        } catch (err) {
            console.error("Noe gikk galt ved oppdatering:", err);
            setError("Noe gikk galt ved oppdatering. Prøv igjen.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="edit-article">
                <div className="edit-article__status edit-article__status--loading">
                    <span className="edit-article__spinner"></span>
                    <p>Henter artikkel...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="edit-article">
            <button
                type="button"
                onClick={() => navigate("/admin/articles")}
                className="edit-article__back-button"
            >
                ← Tilbake
            </button>

            <section className="edit-article__panel">
                <h2 className="edit-article__title">Rediger artikkel</h2>

                <form onSubmit={handleSubmit} className="edit-article__form">
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Tittel*"
                        required
                        disabled={isSaving}
                        className="edit-article__input"
                    />

                    <textarea
                        name="intro"
                        value={formData.intro}
                        onChange={handleChange}
                        placeholder="Introduksjonstekst"
                        rows={3}
                        disabled={isSaving}
                        className="edit-article__textarea"
                    />

                    <textarea
                        name="bodyText"
                        value={formData.bodyText}
                        onChange={handleChange}
                        placeholder="Brødtekst*"
                        rows={8}
                        required
                        disabled={isSaving}
                        className="edit-article__textarea edit-article__textarea--large"
                    />

                    {formData.images.length > 0 && (
                        <div>
                            <h3 className="edit-article__section-title">
                                Eksisterende bilder
                            </h3>

                            <div className="edit-article__image-grid">
                                {formData.images.map((img, index) => (
                                    <div
                                        key={`${img}-${index}`}
                                        className="edit-article__existing-image-item"
                                    >
                                        <img
                                            src={img}
                                            alt={`Eksisterende bilde ${index + 1}`}
                                            className="edit-article__image"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveExistingImage(index)
                                            }
                                            className="edit-article__remove-image-button"
                                            disabled={isSaving}
                                        >
                                            Fjern bilde
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="edit-article__label">
                            Legg til nye bilder
                        </label>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            disabled={isSaving}
                            className="edit-article__file-input"
                        />
                    </div>

                    {selectedFiles.length > 0 && (
                        <div className="edit-article__preview-list">
                            {selectedFiles.map((file, index) => (
                                <div
                                    key={`${file.name}-${index}`}
                                    className="edit-article__preview-item"
                                >
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Nytt bilde ${index + 1}`}
                                        className="edit-article__preview-image"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveSelectedImage(index)
                                        }
                                        className="edit-article__remove-image-button"
                                        disabled={isSaving}
                                    >
                                        Fjern
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="edit-article__submit-button"
                    >
                        {isSaving ? "Lagrer..." : "Lagre endringer"}
                    </button>

                    {isSaving && (
                        <div className="edit-article__status edit-article__status--loading">
                            <span className="edit-article__spinner"></span>
                            <p>Lagrer artikkel. Vennligst vent...</p>
                        </div>
                    )}

                    {success && (
                        <div className="edit-article__status edit-article__status--success">
                            {success}
                        </div>
                    )}

                    {error && (
                        <div className="edit-article__status edit-article__status--error">
                            {error}
                        </div>
                    )}
                </form>
            </section>
        </div>
    );
};

export default EditArticle;