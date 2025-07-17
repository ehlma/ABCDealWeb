import { useEffect, useState } from "react";
import { Link, useAsyncError, useParams } from "react-router-dom";
import api from "../../../api/api";

const ArticlePage = () => {
    const {id} = useParams();
    const [article, setArticle] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState("");
    const images = article?.images || [];

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await api.get(`/articles/${id}`);
                setArticle(res.data);
                setCurrentIndex(0); // tilbakestiller bilde ved ny artikkel
            } catch (err) {
                setError("Kunne ikke hente artikkel.", err);
            }
        };
        fetchArticle();

    }, [id]);
    
    // Useeffect for å bytte bilde med piltaster 
    useEffect(() => {
        const handleKeyDown = (e) => {
            if(images.length > 1 ) {
                if(e.key === "ArrowRight") {
                    setCurrentIndex((prev) => (prev + 1 ) % images.length);
                } else if (e.key === "ArrowLeft") {
                    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);

    }, [images.length]);

    if (error) return <p className="text-red-500">{error}</p>
    if (!article) return <p>Laster artikkel...</p>

    const nexImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="max-w-3xl mx-auto p-6 mt-16">
            <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
                ← Tilbake
            </Link>
            <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
                Publisert: {new Date(article.createdAt).toLocaleDateString()}
            </p>
            {images.length > 0 && (
                <div className="relative mb-6 w-full max-w-[600px] mx-auto">
                    <img
                        src={images[currentIndex]}
                        alt={`Bilde ${currentIndex + 1}`}
                        className="max-h-[400px] w-full object-cover rounded"
                    />

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white hover:bg-white/80 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-xl ring-1 ring-gray-300"
                            >
                                ‹
                            </button>
                            <button
                                onClick={nexImage}
                                className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white hover:bg-white/80 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-xl ring-1 ring-gray-300"
                            >
                                ›
                            </button>
                        </>
                    )}
                </div>
            )}
            <p className="text-lg whitespace-pre-line" >{article.bodyText}</p>
        </div>

    );
};

export default ArticlePage;