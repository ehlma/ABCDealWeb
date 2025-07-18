import { set } from "mongoose";
import { useEffect, useState } from "react";
import {motion, AnimatePresence} from "framer-motion";

const tips = [
    { 
        title: "Vintertips", 
        text: "Før kulda setter inn, påfør et lag med god bilvoks. Det beskytter lakken mot veisalt, snø og slaps, og gjør vask enklere gjennom vinteren."
    },
    { 
        title: "Dødt batteri?", 
        text:"Et svakt batteri kan kollapse helt i minusgrader. Sørg for å få testet batteriet tidlig på vinteren, spesielt om det er eldre enn 3 år."
    },
    { 
        title: "Gummilister", 
        text:"Bruk silikonstift eller spray på dørlister. Dette hindrer at dørene fryser fast og reduserer slitasje på gummien over tid."
    },
    { 
        title: "Lufting av bobil", 
        text:"Stillestående bobiler trenger jevnlig lufting for å unngå fuktskader. Åpne takluker og dører noen minutter, selv om det er kaldt."
    },
    { 
        title: "Solskader", 
        text:"Bruk gardiner eller solskjermer når bilen står parkert i sol. Dette beskytter dashbord, seter og annet interiør mot falming og sprekkdannelse."
    },

];

const TipsCarousel = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % tips.length);
        }, 7000);
        
        return () => clearInterval(timer);
    }, []);

    const currentTip = tips[index];

    return (
        <div className="bg[#f0fdfa] py-12 px-4 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Tips & Vedlikehold</h2>
            <div className="relative h-[220px] max-w-xl mx-auto">
                <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gray-50 rounded-lg shadow p-6 mt-8"
                >
                    <h3 className="text-lg font-semibold text-[#035b50] mb-2">{tips[index].title}</h3>
                    <p className="text-gray-700">{tips[index].text}</p>
                </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TipsCarousel;