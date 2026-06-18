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

    // SEO
    useEffect(() => {
        document.title = "3S Bobil & Caravan | Kjøp og salg av bobil og campingvogn";

        let metaDescription = document.querySelector('meta[name="description"]');

        if (!metaDescription) {
            metaDescription = document.createElement("meta");
            metaDescription.name = "description";
            document.head.appendChild(metaDescription);
        }

        metaDescription.content =
            "3S Bobil & Caravan hjelper deg med kjøp og salg av bobil og campingvogn. Trygge prosesser, personlig oppfølging og solid bransjeerfaring.";
    }, []);

    return (
        <main className="home-page">
            <section className="home-hero">
                <div className="home-hero__content">
                    <p className="home-hero__eyebrow">3S Bobil & Caravan</p>

                    <h1>Kjøp og salg av bobil og campingvogn med trygg oppfølging</h1>

                    <p>
                        Vi hjelper kunder over hele Norge med kjøp og salg av bobil og campingvogn. Med personlig oppfølging og en trygg salgsprosess gjør vi handelen enkel og forutsigbar.
                    </p>

                    <div className="home-hero__actions">
                        <Link
                            to="/for-sale"
                            className="home-button home-button--primary"
                        >
                            Se bobiler og campingvogner til salgs
                        </Link>

                        <Link to="/sales-process" className="home-button home-button--secondary">
                            Slik fungerer prosessen
                        </Link>
                    </div>
                </div>

                <div className="home-hero__image-card">
                    <img src={homePhoto} alt="Bobil og campingvogn formidlet av 3S Bobil & Caravan" />
                </div>
            </section>

            <section className="home-about">
                <div className="home-about__content">
                    <p className="home-about__eyebrow">Om 3S Bobil & Caravan</p>

                    <h2>Erfaring, trygghet og personlig oppfølging</h2>

                    <p>
                        3S Bobil & Caravan hjelper privatpersoner med kjøp og salg av bobil og campingvogn over hele Norge. Med erfaring, struktur og personlig oppfølging sørger vi for en trygg og forutsigbar handel fra første kontakt til overlevering.
                    </p>

                    <Link to="/about" className="home-about__link">
                        Les mer om oss
                    </Link>
                </div>
            </section>

            <section className="home-help">
                <div className="home-section-heading">
                    <p>Hvordan kan vi hjelpe deg med bobil eller campingvogn?</p>
                    <h2>Hjelp med kjøp, salg og rådgivning</h2>
                </div>

                <div className="home-help__grid">
                    <Link
                        to="/sales-process"
                        className="home-help-card home-help-card--large"
                    >
                        <span>01</span>
                        <h3>Selge bobil eller campingvogn?</h3>
                        <p>
                            Vi håndterer hele prosessen fra vurdering og markedsføring
                            til salg og oppgjør.
                        </p>
                    </Link>

                    <Link
                        to="/for-sale"
                        className="home-help-card"
                    >
                        <span>02</span>
                        <h3>Kjøpe bobil eller campingvogn?</h3>
                        <p>
                            Se våre enheter til salgs og få hjelp til å finne riktig
                            løsning for ditt behov.
                        </p>
                    </Link>

                    <Link
                        to="/contact"
                        className="home-help-card"
                    >
                        <span>03</span>
                        <h3>Service eller råd?</h3>
                        <p>
                            Kontakt oss for rådgivning, vurdering eller spørsmål om
                            bobil og campingvogn.
                        </p>
                    </Link>

                    <Link
                        to="/complaints"
                        className="home-help-card home-help-card--dark home-help-card--wide"
                    >
                        <span>04</span>
                        <h3>Reklamasjoner</h3>
                        <p>
                            Har noe gått galt? Vi hjelper deg videre gjennom vår
                            reklamasjonsprosess.
                        </p>
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