import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../api/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
            if (images.length > 1) {
                if (e.key === "ArrowRight") {
                    setCurrentIndex((prev) => (prev + 1) % images.length);
                } else if (e.key === "ArrowLeft") {
                    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);

    }, [images.length]);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!article) return <p>Laster artikkel...</p>;

    const nexImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="bg-[#f0e9df] min-h-screen py-24 px-4 m-0">
            <div className=" mx-auto bg-warm-off-white shadow-md p-8 rounded">
                <Link
                    to="/"
                    className="text-primary hover:text-ui-background hover:underline cursor-pointer text-sm text-start mb-4 inline-block"
                >
                    ← Tilbake
                </Link>

                <h1 className="text-4xl font-bold mb-4 text-primary leading-tight">{article.title}</h1>

                <p className="text-sm text-gray-500 mb-4">
                    Publisert: {new Date(article.createdAt).toLocaleDateString()}
                </p>

                {article.intro && (
                    <p className="text-base text-gray-700 mb-6 leading-relaxed">
                        {article.intro}
                    </p>
                )}

                {images.length > 0 && (
                    <div className="relative mb-6 w-full max-w-[600px] mx-auto">
                        <div className="relative flex justify-center items-center">
                            <img
                                src={images[currentIndex]}
                                alt={`Bilde ${currentIndex + 1}`}
                                className="max-h-[400px] w-full object-cover rounded"
                            />

                <button
                    onClick={prevImage}
                    className="absolute left-[-58px] top-1/2 -translate-y-1/2 bg-transparent
                    text-primary-dark hover:scale-125 transition-transform duration-300"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>

                <button
                    onClick={nexImage}
                    className="absolute right-[-58px] top-1/2 -translate-y-1/2 bg-transparent
                    text-primary-dark hover:scale-125 transition-transform duration-300"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-2">
                {currentIndex + 1} / {images.length}
            </p>
        </div>
        )}

        {/* Brødtekst + footer vises som HTML */}
        <div
            className="text-left text-lg leading-relaxed text-[#333333] [&_a]:underline [&_a:hover]:text-blue-600 mt-6"
            dangerouslySetInnerHTML={{ __html: article.bodyText }}
        />
            <hr className="my-8 border-t" />

            <p className="text-sm text-gray-600 mt-8">
                For mer informasjon, kontakt oss på <strong>+47 47 15 11 11</strong> eller via vårt{" "}
                <Link to="/contact" className="text-ui-background underline">
                    kontaktskjema
                </Link>.
            </p>
        </div>
    </div>
  );
};

export default ArticlePage;
