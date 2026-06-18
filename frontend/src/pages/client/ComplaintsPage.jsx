import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import complaintsContent from "../../contents/complaintsContent";
import complaintLogo from "../../assets/complaintImgs/min-reklamasjon.png";
import "./ComplaintsPage.css";


export default function ComplaintsPage() {
    // SEO
    useEffect(() => {
        document.title = "Reklamasjon | 3S Bobil & Caravan";

        let metaDescription = document.querySelector('meta[name="description"]');

        if (!metaDescription) {
            metaDescription = document.createElement("meta");
            metaDescription.name = "description";
            document.head.appendChild(metaDescription);
        }
        metaDescription.content =
            "Send inn reklamasjon eller ta kontakt med 3S Bobil & Caravan dersom du har spørsmål etter kjøp eller salg av bobil eller campingvogn.";
    }, []);

    return (
        <main className="complaints-page">
            <section className="complaints-hero">
                <div className="complaints-hero__text">
                    <h1>{complaintsContent.hero.title}</h1>

                    <p>{complaintsContent.hero.subtitle}</p>

                    <a
                        href={complaintsContent.button.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="complaints-button"
                    >
                        {complaintsContent.button.text}
                    </a>
                </div>

            </section>

            <section className="complaints-content">
                <div className="complaints-content__heading">
                    <h2>{complaintsContent.information.heading}</h2>
                </div>

                <div className="complaints-content__text bg-warm-off-white">
                    <div className="complaints-hero__image-box">
                        <img
                            src={complaintLogo}
                            alt="Min Reklamasjon"
                            className="complaints-hero__image"
                        />
                    </div>
                    <p>{complaintsContent.information.text}</p>
                </div>
            </section>
        </main>
    );
}