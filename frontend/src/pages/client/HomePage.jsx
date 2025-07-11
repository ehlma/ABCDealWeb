import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import api from "../../../api/api.js";

const HomePage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await api.get("/articles");
                setArticles(res.data.slice(0, 4));
            } catch (err) {
                console.error("Kunne ikke hente artikler", err);
            }
        };
        fetchArticles();

    }, []);

    return (
        <div className="text-center mt-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">Velkommen til ABC Deal</h1>
            <p className="text-lg text-gray-700">Din pålitelige forhandler av biler, campongvogner og bobiler.</p>
            <div className="mt-8 p-8 bg-blue-100 rounded-lg shadow">
                <p className="text-xl text-blue-800">Utforsk vårt utvalg av bobiler for ditt neste eventyr!</p>
            </div>

            <h2 className="text-2xl font-semibold mt-12 mb-3 text-primary">Aktuelt</h2>
            <div className="grid gap-6 md:grid-cols-2">
                {articles.map((article) => (
                    <div key={article._id} className="bg-white rounded shadow-md overflow-hidden py-4 m-12">
                        <h3 className="text-lg mb-2">{article.title}</h3>
                        {article.images && article.images[0] && (
                            <img 
                                src={article.images[0]} 
                                alt={article.title} 
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <p className="text-gray-700 text-sm mb-3 mt-4">{article.intro}</p>
                        <Link
                            to={`/articles/${article._id}`}
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Les mer →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;