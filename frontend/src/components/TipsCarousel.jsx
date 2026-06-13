import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const tips = [
  {
    title: "Vintertips: Beskytt lakken",
    text: "Før kulda setter inn, påfør et lag med god bilvoks. Det beskytter lakken mot veisalt, snø og slaps, og gjør vask enklere gjennom vinteren."
  },
  {
    title: "Batterisjekk før kulda",
    text: "Et svakt batteri kan kollapse helt i minusgrader. Sørg for å få testet batteriet tidlig på vinteren, spesielt om det er eldre enn 3 år."
  },
  {
    title: "Smør gummilister",
    text: "Bruk silikonstift eller spray på dørlister. Dette hindrer at dørene fryser fast og reduserer slitasje på gummien over tid."
  },
  {
    title: "Luft bobilen – også om vinteren",
    text: "Stillestående bobiler trenger jevnlig lufting for å unngå fuktskader. Åpne takluker og dører noen minutter, selv om det er kaldt."
  },
  {
    title: "Unngå solskader i interiøret",
    text: "Bruk gardiner eller solskjermer når bilen står parkert i sol. Dette beskytter dashbord, seter og annet interiør mot falming og sprekkdannelse."
  },
];

const TipsCarousel = () => {
    const [index, setIndex] = useState(0);
    const [manualChange, setManualChange] = useState(false);

    useEffect(() => {
        let delay = manualChange ? 8000 : 5000; // 8 sek hvis klikket manuelt, ellers 5 sek
        const timer = setTimeout(() => {
            setIndex((prev) => (prev + 1) % tips.length);
            setManualChange(false); // tilbakestill etter autoscroll
        }, delay);
      
        return () => clearTimeout(timer);
      }, [index, manualChange]);

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + tips.length) % tips.length);
    };

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % tips.length);
    };

    return (
        <div className="py-12 px-4 text-center">
            <h2 className="text-2xl font-bold bg-primary mb-6">Tips & Vedlikehold</h2>

            <div className="relative h-[220px] max-w-xl mx-auto">     
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-white rounded-lg shadow p-6"
                    >
                        <h3 className="text-lg font-semibold text-[#035b50] mb-2">{tips[index].title}</h3>
                        <p className="text-gray-700">{tips[index].text}</p>
                    </motion.div>
                </AnimatePresence>

                {/* Navigasjonspiler */}
                <button
                    onClick={handlePrev}
                    className="absolute left-[-60px] top-1/2 transform bg-transparent -translate-y-1/2 bg-primary hover:text-[#035b50] hover:scale-125 ease-in-out duration-150"
                    aria-label="Forrige tips"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-[-60px] top-1/2 transform bg-transparent -translate-y-1/2 bg-primary hover:text-[#035b50] hover:scale-125 ease-in-out duration-150"
                    aria-label="Neste tips"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Klikkbare prikker */}
            <div className="mt-6 flex justify-center gap-2">
                {tips.map((_, i) => {
                    const active = i === index;
                    return (
                        <button
                            key={i}
                            onClick={() => {
                                setIndex(i);
                                setManualChange(true); // marker at dette var manuelt
                            }}
                            aria-label={`Gå til tips ${i + 1}`}
                            aria-current={active ? "true" : undefined}
                            className={`w-0.5 h-1 rounded-full transition-all duration-300 focus:outline-none ${
                                active ? "bg-primary scale-110" : "bg-gray-300 hover:bg-gray-400"
                            }`}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default TipsCarousel;
