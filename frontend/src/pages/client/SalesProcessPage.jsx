import { useState } from "react";
import salesProcessContent from "../../contents/salesProcessContent";
import "./SalesProcessPage.css";

export default function SalesProcessPage() {
    const [activeProcess, setActiveProcess] = useState("sale");

    const process = salesProcessContent[activeProcess];

    return (
        <main className="sales-process-page">
            <section className="sales-process-hero">
                <p className="sales-process-hero__eyebrow">Prosess</p>

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
                    <span>{process.description}</span>
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
        </main>
    );
}