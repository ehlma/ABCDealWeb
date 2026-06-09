import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../api/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./ArticlePage.css";

const ArticlePage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState("");

    const images = article?.images || [];

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await api.get(`/articles/${id}`);
                setArticle(res.data);
                setCurrentIndex(0);
            } catch (err) {
                setError("Kunne ikke hente artikkel.");
            }
        };

        fetchArticle();
    }, [id]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (images.length <= 1) return;

            if (e.key === "ArrowRight") {
                setCurrentIndex((prev) => (prev + 1) % images.length);
            }

            if (e.key === "ArrowLeft") {
                setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [images.length]);

    if (error) return <p className="article-page__error">{error}</p>;
    if (!article) return <p className="article-page__loading">Laster artikkel...</p>;

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <main className="article-page">
            <article className="article">
                <Link to="/" className="article__back-link">
                    ← Tilbake
                </Link>

                <header className="article__header">
                    <p className="article__eyebrow">Aktuelt</p>

                    <h1>{article.title}</h1>

                    <p className="article__date">
                        Publisert: {new Date(article.createdAt).toLocaleDateString("nb-NO")}
                    </p>

                    {article.intro && <p className="article__intro">{article.intro}</p>}
                </header>

                {images.length > 0 && (
                    <section className="article-gallery">
                        <div className="article-gallery__image-wrapper">
                            <img
                                src={images[currentIndex]}
                                alt={`Bilde ${currentIndex + 1}`}
                                className="article-gallery__image"
                            />

                            {images.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={prevImage}
                                        className="article-gallery__button article-gallery__button--left"
                                        aria-label="Forrige bilde"
                                    >
                                        <ChevronLeft />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={nextImage}
                                        className="article-gallery__button article-gallery__button--right"
                                        aria-label="Neste bilde"
                                    >
                                        <ChevronRight />
                                    </button>
                                </>
                            )}
                        </div>

                        {images.length > 1 && (
                            <div className="article-gallery__footer">
                                <p>
                                    {currentIndex + 1} / {images.length}
                                </p>

                                <div className="article-gallery__dots">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => setCurrentIndex(index)}
                                            className={index === currentIndex ? "active" : ""}
                                            aria-label={`Gå til bilde ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                <div
                    className="article__body"
                    dangerouslySetInnerHTML={{ __html: article.bodyText }}
                />

                <footer className="article__contact">
                    <h2>Vil du vite mer?</h2>

                    <p>
                        Kontakt oss på <strong>+47 408 28 494</strong>, eller send oss en
                        melding via{" "}
                        <Link to="/contact">
                            kontaktskjemaet
                        </Link>.
                    </p>
                </footer>
            </article>
        </main>
    );
};

export default ArticlePage;