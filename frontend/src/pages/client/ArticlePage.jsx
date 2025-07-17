import { useEffect, useState } from "react";
import { Link, useAsyncError, useParams } from "react-router-dom";
import api from "../../../api/api";
import { ChevronLeft, ChevronRight } from "lucide-react";


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
        <div className="bg-[#F8F8F8] min-h-screen py-24 px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-md p-8 rounded">

                <Link 
                to="/" 
                className="text-primary hover:underline text-sm mb-4 inline-block">
                    ← Tilbake
                </Link>
                <h1 className="text-4xl font-bold mb-4 text-primary leading-tight">{article.title}</h1>
                <p className="text-sm text-gray-500 mb-6">
                    Publisert: {new Date(article.createdAt).toLocaleDateString()}
                </p>
                {images.length > 0 && (
                    <div className="relative mb-6 w-full max-w-[600px] mx-auto">
                    {/* Wrapper for bilde og piler */}
                        <div className="relative flex justify-center items-center">
                            <img
                                src={images[currentIndex]}
                                alt={`Bilde ${currentIndex + 1}`}
                                className="max-h-[400px] w-full object-cover rounded"
                            />
                  
                            {/* Venstre pil */}
                            <button
                                onClick={prevImage}
                                className="absolute left-[-58px] top-1/2 -translate-y-1/2 bg-transparent
                                text-primary-dark hover:scale-125 transition-transform duration-300"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                  
                            {/* Høyre pil */}
                            <button
                                onClick={nexImage}
                                className="absolute right-[-58px] top-1/2 -translate-y-1/2 bg-transparent
                                text-primary-dark hover:scale-125 transition-transform duration-300"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </div>
                  
                        {/* Bilde-teller under bildet */}
                        <p className="text-center text-sm text-gray-500 mt-2">
                            {currentIndex + 1} / {images.length}
                        </p>
                  </div>
                  
                )}
                <p className="text-left text-lg leading-relaxed text-[#333333] whitespace-pre-line" >{article.bodyText}</p>
            </div>
        </div>

    );
};

export default ArticlePage;