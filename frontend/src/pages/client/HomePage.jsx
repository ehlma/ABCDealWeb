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
        <div className="p-8 text-center">
            <h1 className="text-4xl font-bold mb-4 text-[047464]">Velkommen til ABC Deal</h1>
            <p className="text-lg text-gray-700">Din pålitelige forhandler av campongvogner og bobiler.</p>
            <div className="mt-8 p-8 bg-blue-100 rounged-lg shadow">
                <p className="text-xl text-blue-800">Utforsk vårt utvalg av bobiler for ditt neste eventyr!</p>
            </div>

            <h2>Aktuelt</h2>
            <div>
                {articles.map((article) => (
                    <div key={article._id}>
                        <h3>{article.title}</h3>
                        {article.images && article.images[0] && (
                            <img src={article.images[0]} alt="" />
                        )}
                        <p>{article.intro}</p>
                        <Link
                            to={`/articles/${article._id}`}
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