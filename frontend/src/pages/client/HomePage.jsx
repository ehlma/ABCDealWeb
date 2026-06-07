import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/api.js";
import homePhoto from "../../assets/caravan-view.png";
import TipsCarousel from "../../components/TipsCarousel.jsx";
import "./HomePage.css";

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
        <main className="home-page">
            <section className="home-hero">
                <div className="home-hero__content">
                    <p className="home-hero__eyebrow">3S Bobil & Caravan</p>

                    <h1>Velkommen til 3S Bobil & Caravan</h1>

                    <p>
                        Vi gjør det enkelt å kjøpe og selge bobil og campingvogn,
                        trygt og profesjonelt.
                    </p>

                    <div className="home-hero__actions">
                        <a
                            href="https://www.finn.no/mobility/search/car/mobilehome?orgId=9411670"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="home-button home-button--primary"
                        >
                            Se kjøretøy til salgs
                        </a>

                        <Link to="/sales-process" className="home-button home-button--secondary">
                            Slik fungerer prosessen
                        </Link>
                    </div>
                </div>

                <div className="home-hero__image-card">
                    <img src={homePhoto} alt="Bobil hos 3S Bobil & Caravan" />
                </div>
            </section>

            <section className="home-help">
                <div className="home-section-heading">
                    <p>Hva kan vi hjelpe med?</p>
                    <h2>Velg det som passer deg best</h2>
                </div>

                <div className="home-help__grid">
                    <Link to="/sales-process" className="home-help-card home-help-card--large">
                        <span>01</span>
                        <h3>Selge bil eller bobil?</h3>
                        <p>Trygt, effektivt og uten stress – vi hjelper deg hele veien.</p>
                    </Link>

                    <a
                        href="https://www.finn.no/mobility/search/car/mobilehome?orgId=8250738"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="home-help-card"
                    >
                        <span>02</span>
                        <h3>Kjøpe bobil?</h3>
                        <p>Se våre bobiler og få råd om hvilket kjøp som passer deg.</p>
                    </a>

                    <a
                        href="https://www.finn.no/mobility/search/car?orgId=8250738"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="home-help-card"
                    >
                        <span>03</span>
                        <h3>Kjøpe bil?</h3>
                        <p>Se våre biler og få råd om hvilket kjøp som passer deg.</p>
                    </a>

                    <Link to="/contact" className="home-help-card">
                        <span>04</span>
                        <h3>Service eller råd?</h3>
                        <p>Kontakt oss for vurdering, rådgivning eller garanti.</p>
                    </Link>

                    <Link to="/complaints" className="home-help-card home-help-card--dark">
                        <span>05</span>
                        <h3>Reklamasjoner</h3>
                        <p>Har noe gått galt? Vi tar reklamasjoner på alvor.</p>
                    </Link>
                </div>
            </section>

            <section className="home-articles">
                <div className="home-section-heading">
                    <p>Aktuelt</p>
                    <h2>Siste nytt fra oss</h2>
                </div>

                <div className="home-articles__grid">
                    {articles.map((article) => (
                        <article key={article._id} className="home-article-card">
                            {article.images?.[0] && (
                                <img src={article.images[0]} alt={article.title} />
                            )}

                            <div>
                                <h3>{article.title}</h3>
                                <p>{article.intro}</p>

                                <Link to={`/articles/${article._id}`}>
                                    Les mer →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="home-tips">
                <TipsCarousel />
            </section>
        </main>
    );
};

export default HomePage;