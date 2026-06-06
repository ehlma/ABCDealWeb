import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./TipsCarousel.css";

const tips = [
    {
        title: "Vintertips: Beskytt lakken",
        text: "Før kulda setter inn, påfør et lag med god bilvoks. Det beskytter lakken mot veisalt, snø og slaps, og gjør vask enklere gjennom vinteren.",
    },
    {
        title: "Batterisjekk før kulda",
        text: "Et svakt batteri kan kollapse helt i minusgrader. Sørg for å få testet batteriet tidlig på vinteren, spesielt om det er eldre enn 3 år.",
    },
    {
        title: "Smør gummilister",
        text: "Bruk silikonstift eller spray på dørlister. Dette hindrer at dørene fryser fast og reduserer slitasje på gummien over tid.",
    },
    {
        title: "Luft bobilen – også om vinteren",
        text: "Stillestående bobiler trenger jevnlig lufting for å unngå fuktskader. Åpne takluker og dører noen minutter, selv om det er kaldt.",
    },
    {
        title: "Unngå solskader i interiøret",
        text: "Bruk gardiner eller solskjermer når bilen står parkert i sol. Dette beskytter dashbord, seter og annet interiør mot falming og sprekkdannelse.",
    },
];

const TipsCarousel = () => {
    const [index, setIndex] = useState(0);
    const [manualChange, setManualChange] = useState(false);

    useEffect(() => {
        const delay = manualChange ? 8000 : 5000;

        const timer = setTimeout(() => {
            setIndex((prev) => (prev + 1) % tips.length);
            setManualChange(false);
        }, delay);

        return () => clearTimeout(timer);
    }, [index, manualChange]);

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + tips.length) % tips.length);
        setManualChange(true);
    };

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % tips.length);
        setManualChange(true);
    };

    return (
        <section className="tips-carousel">
            <div className="tips-carousel__inner">
                <div className="tips-carousel__heading">
                    <p>Tips & vedlikehold</p>
                    <h2>Nyttige råd</h2>
                </div>

                <div className="tips-carousel__content">
                    <button
                        onClick={handlePrev}
                        className="tips-carousel__arrow tips-carousel__arrow--left"
                        aria-label="Forrige tips"
                        type="button"
                    >
                        <ChevronLeft />
                    </button>

                    <div className="tips-carousel__viewport">
                        <AnimatePresence mode="wait">
                            <motion.article
                                key={index}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -18 }}
                                transition={{ duration: 0.35 }}
                                className="tips-carousel__card"
                            >
                                <span>{String(index + 1).padStart(2, "0")}</span>
                                <h3>{tips[index].title}</h3>
                                <p>{tips[index].text}</p>
                            </motion.article>
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={handleNext}
                        className="tips-carousel__arrow tips-carousel__arrow--right"
                        aria-label="Neste tips"
                        type="button"
                    >
                        <ChevronRight />
                    </button>
                </div>

                <div className="tips-carousel__dots">
                    {tips.map((_, i) => {
                        const active = i === index;

                        return (
                            <button
                                key={i}
                                onClick={() => {
                                    setIndex(i);
                                    setManualChange(true);
                                }}
                                aria-label={`Gå til tips ${i + 1}`}
                                aria-current={active ? "true" : undefined}
                                className={active ? "active" : ""}
                                type="button"
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TipsCarousel;