import { useEffect, useRef, useState } from "react";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";
import "./AdminArticles.css";

const AdminArticles = () => {
    const [articles, setArticles] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        intro: "",
        bodyText: "",
        images: [],
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setSelectedFiles((prev) => [
            ...prev,
            ...Array.from(e.target.files),
        ]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsSubmitting(true);

        if (!formData.title || !formData.bodyText) {
            setError("Tittel og brødtekst er påkrevd.");
            setIsSubmitting(false);
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
                bodyText: formData.bodyText,
            };

            if (formData.intro) payload.intro = formData.intro;
            if (imageUploads.length > 0) payload.images = imageUploads;

            await api.post("/articles", payload);

            setSuccess("Artikkelen ble publisert!");

            setFormData({
                title: "",
                intro: "",
                bodyText: "",
                images: [],
            });

            setSelectedFiles([]);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            setVisibleCount(6);

            await fetchArticles();
        } catch (err) {
            console.error("Feil:", err);
            setError("Noe gikk galt ved publisering. Prøv igjen.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/articles/${id}`);

            setArticles((prevArticles) =>
                prevArticles.filter((article) => article._id !== id)
            );
        } catch (err) {
            console.error("Kunne ikke slette artikkel", err);
            setError("Kunne ikke slette artikkel");
        }
    };

    const sortedArticles = [...articles].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const visibleArticles = sortedArticles.slice(0, visibleCount);
    const hasMoreArticles = visibleCount < sortedArticles.length;

    return (
        <div className="admin-articles">
            <section className="admin-articles__panel">
                <form onSubmit={handleSubmit} className="admin-articles__form">
                    <h2 className="admin-articles__title">Ny artikkel</h2>

                    <input
                        name="title"
                        type="text"
                        placeholder="Tittel*"
                        value={formData.title}
                        onChange={handleChange}
                        className="admin-articles__input"
                        disabled={isSubmitting}
                        required
                    />

                    <input
                        ref={fileInputRef}
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="admin-articles__file-input"
                        disabled={isSubmitting}
                        required
                    />

                    {selectedFiles.length > 0 && (
                        <div className="admin-articles__preview-list">
                            {selectedFiles.map((file, index) => (
                                <img
                                    key={`${file.name}-${index}`}
                                    src={URL.createObjectURL(file)}
                                    alt={`Forhåndsvisning ${index + 1}`}
                                    className="admin-articles__preview-image"
                                />
                            ))}
                        </div>
                    )}

                    <textarea
                        name="intro"
                        placeholder="Introduksjonstekst"
                        value={formData.intro}
                        onChange={handleChange}
                        className="admin-articles__textarea"
                        rows={3}
                        disabled={isSubmitting}
                    />

                    <textarea
                        name="bodyText"
                        placeholder="Brødtekst*"
                        value={formData.bodyText}
                        onChange={handleChange}
                        className="admin-articles__textarea admin-articles__textarea--large"
                        rows={8}
                        disabled={isSubmitting}
                        required
                    />

                    <button
                        type="submit"
                        className="admin-articles__button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Publiserer..." : "Opprett artikkel"}
                    </button>

                    {isSubmitting && (
                        <div className="admin-articles__status admin-articles__status--loading">
                            <span className="admin-articles__spinner"></span>
                            <p>Publiserer artikkel. Vennligst vent...</p>
                        </div>
                    )}

                    {error && (
                        <div className="admin-articles__status admin-articles__status--error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="admin-articles__status admin-articles__status--success">
                            {success}
                        </div>
                    )}
                </form>

                <aside className="admin-articles__info">
                    <h3 className="admin-articles__info-title">
                        Publisering av artikler
                    </h3>

                    <p className="admin-articles__info-text">
                        Her kan du publisere artikler som vil vises på hjemmesiden under{" "}
                        <span className="admin-articles__highlight">
                            "Aktuelt"-seksjonen
                        </span>
                        . Artiklene kan brukes til å dele nyheter, oppdateringer, råd
                        eller informasjon som kan være nyttig for kundene dine.
                    </p>

                    <h4 className="admin-articles__tips-title">
                        Tips til publisering
                    </h4>

                    <ul className="admin-articles__tips-list">
                        <li>Bruk en tydelig og beskrivende tittel</li>
                        <li>Last opp minst ett bilde, helst i liggende format</li>
                        <li>Skriv en kort introduksjon for å fange leserens interesse</li>
                        <li>Bruk brødteksten til å utdype innholdet - dette vises på hjem-siden</li>
                        <li>Hold språket enkelt og lett å lese</li>
                    </ul>
                </aside>
            </section>

            <section className="admin-articles__published">
                <h2 className="admin-articles__published-title">
                    Publiserte artikler
                </h2>

                <div className="admin-articles__grid">
                    {visibleArticles.map((article) => (
                        <article key={article._id} className="admin-articles__card">
                            <div className="admin-articles__image-wrapper">
                                {article.images?.[0] ? (
                                    <img
                                        src={article.images[0]}
                                        alt={article.title}
                                        className="admin-articles__image"
                                    />
                                ) : (
                                    <div className="admin-articles__image-placeholder">
                                        Ingen bilde
                                    </div>
                                )}
                            </div>

                            <div className="admin-articles__card-content">
                                <h3 className="admin-articles__card-title">
                                    {article.title}
                                </h3>

                                <p className="admin-articles__date">
                                    {article.createdAt?.slice(0, 10)}
                                </p>

                                <p className="admin-articles__intro">
                                    {article.intro ||
                                        `${article.bodyText?.slice(0, 120)}...`}
                                </p>

                                <div className="admin-articles__actions">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                `/admin/articles/edit/${article._id}`
                                            )
                                        }
                                        className="admin-articles__edit-button"
                                    >
                                        Rediger
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDelete(article._id)}
                                        className="admin-articles__delete-button"
                                    >
                                        Slett
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {hasMoreArticles && (
                    <div className="admin-articles__load-more">
                        <button
                            type="button"
                            onClick={() => setVisibleCount((prev) => prev + 6)}
                            className="admin-articles__load-more-button"
                        >
                            Last inn flere
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default AdminArticles;