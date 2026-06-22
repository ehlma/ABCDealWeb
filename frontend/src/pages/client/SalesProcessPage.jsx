import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import salesProcessContent from "../../contents/salesProcessContent";
import "./SalesProcessPage.css";

export default function SalesProcessPage() {
    const [activeProcess, setActiveProcess] = useState("sale");

    const process = salesProcessContent[activeProcess];

    // SEO
    useEffect(() => {
        document.title = "Salgs- og kjøpsprosessen | 3S Bobil & Caravan";

        let metaDescription = document.querySelector(
            'meta[name="description"]'
        );

        if (!metaDescription) {
            metaDescription = document.createElement("meta");
            metaDescription.name = "description";
            document.head.appendChild(metaDescription);
        }

        metaDescription.content =
            "Se hvordan 3S Bobil & Caravan hjelper deg gjennom kjøp og salg av bobil og campingvogn med en trygg og forutsigbar prosess.";
    }, []);

    return (
        <main className="sales-process-page">
            <section className="sales-process-hero">
                <p className="sales-process-hero__eyebrow">Salgs- og kjøpsprosessen</p>

                <h1>{salesProcessContent.hero.title}</h1>

                <p>{salesProcessContent.hero.subtitle}</p>

                <div className="sales-process-tabs">
                    <button
                        type="button"
                        className={activeProcess === "sale" ? "active" : ""}
                        onClick={() => setActiveProcess("sale")}
                    >
                        {salesProcessContent.tabs.sale}
                    </button>

                    <button
                        type="button"
                        className={activeProcess === "purchase" ? "active" : ""}
                        onClick={() => setActiveProcess("purchase")}
                    >
                        {salesProcessContent.tabs.purchase}
                    </button>
                </div>
            </section>

            <section className="sales-process-layout">
                <aside className="sales-process-intro">
                    <p>{process.eyebrow}</p>
                    <h2>{process.title}</h2>
                    <p>{process.description}</p>
                </aside>

                <div className="sales-process-steps">
                    {process.steps.map((step, index) => (
                        <article className="sales-process-step" key={step.title}>
                            <div className="sales-process-step__number">
                                {String(index + 1).padStart(2, "0")}
                            </div>

                            <div className="sales-process-step__content">
                                <h3>{step.title}</h3>
                                <p>{step.text}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="sales-process-cta">
                <div className="sales-process-cta__content">
                    <p className="sales-process-cta__eyebrow">Klar for neste steg?</p>
                    <h2>La oss hjelpe deg med kjøp eller salg av bobil</h2>
                    <p>Enten du skal kjøpe eller selge bobil, hjelper vi deg gjennom hele prosessen med personlig oppfølging og en trygg handel.</p>

                    <Link
                        to="/contact"
                        className="sales-process-cta__button"
                    >
                        Kontakt oss
                    </Link>
                </div>
            </section>
        </main>
    );
}