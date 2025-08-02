import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import api from "../../../api/api.js";
import homePhoto from "../../assets/homePhoto.jpeg";
import TipsCarousel from "../../components/TipsCarousel.jsx";


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
    <div className="w-full overflow-x-hidden">
        {/* HERO. Top of the site */}
        <section
            className="relative h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center justify-center text-white text-center"
            style={{ backgroundImage: `url(${homePhoto})` }}
        >
            <div className="absolute inset-0 bg-black/40" /> {/* Overlegg */}
                <div className="relative z-10 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-warm-off-white">Velkommen til ABC Deal</h1>
                    <p className="text-xl md:text-2xl max-w-2xl mx-auto text-warm-off-white">
                        Vi gjør det enkelt å kjøpe og selge bobil, campingvogn og bil – trygt og profesjonelt.
                    </p>
                    <a
                        href="https://www.finn.no/mobility/search/car/mobilehome?orgId=8250738"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-block px-6 py-2 rounded-md bg-[#047464] text-primary font-medium shadow-sm bg-warm-off-white hover:bg-primary hover:text-warm-off-white transition duration-200 ease-in-out"
                    >
                        Til salgs
                    </a>

                </div>
            </section>
        
            {/* HVA KAN VI HJELPE MED */}
            <section className="py-20 px-4 text-center">
                <h2 className="text-3xl font-bold mb-10 text-[#047464]">Hvordan kan vi hjelpe deg?</h2>
                <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
                    <Link to="/sales-process" className="bg-warm-off-white rounded-lg p-6 shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold mb-2 text-[#004f4f]">Selge bil eller bobil?</h3>
                        <p className="text-gray-700">Trygt, effektivt og uten stress – vi hjelper deg hele veien.</p>
                    </Link>
                    <a
                        href="https://www.finn.no/mobility/search/car/mobilehome?orgId=8250738"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-warm-off-white rounded-lg p-6 shadow hover:shadow-md transition"
                    >
                        <h3 className="text-xl font-semibold mb-2 text-[#004f4f]">Kjøpe bobil?</h3>
                        <p className="text-gray-700">Se våre bobiler og få råd om hvilket kjøp som passer deg.</p>
                    </a>
                    <a
                        href="https://www.finn.no/mobility/search/car?orgId=8250738"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-warm-off-white rounded-lg p-6 shadow hover:shadow-md transition"
                    >
                        <h3 className="text-xl font-semibold mb-2 text-[#004f4f]">Kjøpe bil?</h3>
                        <p className="text-gray-700">Se våre bobiler og få råd om hvilket kjøp som passer deg.</p>
                    </a>
                </div>
                <div className="grid gap-6 md:grid-cols-2 m-6 max-w-6xl mx-auto">
                    <div className=" hidden mb:block"></div>
                    <Link to="/contact" className="bg-warm-off-white rounded-lg p-6 shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold mb-2 text-[#004f4f]">Service eller råd?</h3>
                        <p className="text-gray-700">Kontakt oss for vurdering, rådgivning eller garanti.</p>
                    </Link>
                    <Link to="/complaints" className="bg-warm-off-white rounded-lg p-6 shadow hover:shadow-md transistion">
                        <h3 className="text-xl font-semibold mb-2 text-[#004f4f]">Reklamasjoner</h3>
                        <p className="text-gray-700">Har noe gått galt? Vi tar reklamasjoner på alvor. Trykk her for reklamasjonsskjema. </p>
                    </Link>

                </div>
            </section>
        
              {/* ARTIKLER */}
            <section className="py-20 px-4 bg-[#f0e9df]">
                <h2 className="text-3xl font-bold text-center text-[#047464] mb-10">Aktuelt</h2>
                <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
                    {articles.map((article) => (
                        <div key={article._id} className="bg-warm-off-white rounded-lg shadow overflow-hidden hover:shadow-md transition">
                            {article.images?.[0] && (
                            <img
                                src={article.images[0]}
                                alt={article.title}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2 text-[#047464]">{article.title}</h3>
                            <p className="text-gray-700 text-sm mb-4">{article.intro}</p>
                            <Link
                                to={`/articles/${article._id}`}
                                className="text-[#047464] font-medium hover:underline"
                            >
                                Les mer →
                            </Link>
                        </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <TipsCarousel/>
              </section>
            </div>
        );
};

export default HomePage;