import React, { useState, useEffect, useRef } from "react";
import ScrollIndicator from "./ScrollIndicator";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import backgroundImage from "../../assets/salesprocess/backgroundImage.jpg";
import intro from "../../assets/salesprocess/intro.png";
import start from "../../assets/salesprocess/start.png";
import annonsering from "../../assets/salesprocess/annonsering.png";
import kontaktOgVisning from "../../assets/salesprocess/kontaktVisning.png";
import oppgjør from "../../assets/salesprocess/oppgjør.png";
import garanti from "../../assets/salesprocess/garanti.png";
import bileier from "../../assets/salesprocess/bileier.png";
import rådgivning from "../../assets/salesprocess/rådgivning.png";
import vurdering from "../../assets/salesprocess/vurdering.png";

const bodyTextColor = "text-[#fffefc]";

const steps = [
    "Intro",
    "Start",
    "Vurdering og annonsering",
    "Kontakt og visning",
    "Oppgjør",
    "Garanti",
    "Bileier",
    "Rådgivning",
    "Ønsker du en vurdering?"
];

const icons = [
    intro,
    start,
    annonsering,
    kontaktOgVisning,
    oppgjør,
    garanti,
    bileier,
    rådgivning,
    vurdering
];


const contents = [
    <>
        <p 
            className="text-lg"
            style={{color : bodyTextColor}}
        >
            Kjernen i vårt konsept oppsummeres i slagordet «<strong>sammen på rett vei</strong>»
            da vi forener det beste fra en privat handel og tryggheten ved et forhandlersalg.
        </p>
    </>,
    <>
         <p 
            className="text-lg"
            style={{color : bodyTextColor}}
        >
            Når du vurderer å selge bobilen din, starter vi prosessen sammen – alltid på dine premisser. 
            Vårt konsept bygger på trygghet og enkelhet. Som bileier får du en uforpliktende vurdering 
            ved å sende oss informasjon om bilen din, inkludert merke, årsmodell, km-stand og utstyr.
        </p>
    </>,
    <>
         <p 
            className="text-lg"
            style={{color : bodyTextColor}}
        >
            Etter at vi har mottatt informasjon om bilen, gjør vi en vurdering og gir deg et tilbud som tilsvarer 
            hva du kunne fått i et privatsalg, men med langt mindre arbeid for deg. Du bidrar med bilder og detaljer, 
            og vi utformer en annonse som publiseres i vårt navn som forhandler.
        </p>
    </>,
    <>
        <p 
            className="text-lg"
            style={{color : bodyTextColor}}
        >
            Når interessenter melder seg, setter vi dem i kontakt med deg som eier. Dere avtaler visning direkte, 
            og du kan fortsatt bruke bilen fritt frem til salg. Om ønskelig kan vi hjelpe med å tilrettelegge visningen.
        </p>
    </>,
    <>
         <p 
            className="text-lg"
            style={{color : bodyTextColor}}
        >
            Når kjøper og selger er enige, håndterer vi alt det formelle. Vi utarbeider avtaler, sender inn salgsmelding 
            og sørger for et trygt, mellomliggende oppgjør. Vi sikrer at prosessen er trygg for begge parter.
        </p>
    </>,
    <>
         <p 
            className="text-lg"
            style={{color : bodyTextColor}}
        >
            Vi tilbyr garanti til kjøperen, og kjøpet annonseres ut fra oss som forhandler. Dette gir økt forutsigbarhet 
            og trygghet for ny eier. Skulle det oppstå problemer, er det vi som står ansvarlige for eventuelle reklamasjoner.
        </p>
    </>,
    <>
        <div 
            className="space-y-4 text-lg"
            style={{color : bodyTextColor}}
        >
            <p>
                Bileier bidrar med bilder og informasjon til annonsen. Ved behov sørger bileier for kontroll av bilen 
                – som fukttest, EU-kontroll eller service.
            </p>
            <p>
                Bileier viser som regel bilen selv, og beholder full disposisjon over den fram til visning med interessert kjøper 
                – med mindre annet avtales.
            </p>
        </div>
    </>,
    <>
         <p 
            className="text-lg"
            style={{color : bodyTextColor}}
        >
            De fleste handler skjer med biler i vår portefølje, men vi hjelper deg også gjerne ved kjøp av bil fra andre aktører. 
            Vi tilbyr kjøpsråd, bistand i prisforhandling og generell rådgivning som gjør handelen enklere og tryggere.
        </p>
    </>,
    <>
        <div 
            className="space-y-4 text-lg"
            style={{color : bodyTextColor}}
        >
            <p>
            Har du en bil du ønsker vår uforpliktende vurdering av?  
            Bruk vårt{" "}
            <a href="/contact" className="text-primary underline">
                kontaktskjema
            </a>{" "}
            og legg inn informasjon om:
            </p>
            <ul className="list-disc list-inside">
                <li>Merke</li>
                <li>Årsmodell</li>
                <li>Kilometerstand</li>
                <li>Utstyr (f.eks. girtype, solcelle, lithiumbatteri, støtteben, AC i bodel, vinterhjul)</li>
            </ul>
            <p>
                Vi sender deg et uforpliktende tilbud basert på vår selvfinansierte modell for et enklere og tryggere salg.
            </p>
        </div>
    </>
];
  

const SalesProcessPage = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRefs = useRef([]);

    useEffect(() => {
        // Lås scroll på hele dokumentet
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
    
        return () => {
            // Sett tilbake når komponenten unmountes
            document.documentElement.style.overflow = "auto";
            document.body.style.overflow = "auto";
        };
    }, []);
    

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = sectionRefs.current.indexOf(entry.target);
                        if (index !== -1) {
                            setActiveIndex(index);
                        }
                    }
                });
            },
        { threshold: 0.6 }
        );

        sectionRefs.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            sectionRefs.current.forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Bakgrunnsbilde */}
            <img
                src={backgroundImage}
                alt="Background"
                className="fixed inset-0 w-full h-full object-cover z-0"
            />
            {/* Scroll-indikator – horisontal */}
            <div className="hidden md:flex fixed top-28 left-1/2 -translate-x-1/2 z-20">
                <ScrollIndicator
                    activeIndex={activeIndex}
                    sectionRefs={sectionRefs}
                    steps={steps}
                />
            </div>

    
            {/* Seksjoner */}
            <div className="snap-y snap-mandatory h-screen overflow-y-scroll hide-scrollbar scroll-smooth relative z-10">
                {steps.map((label, index) => {
                    const ref = useRef(null);
                    const isInView = useInView(ref, { amount: 0.3 });
    
                    return (
                        <section
                            key={index}
                            ref={(el) => {
                                sectionRefs.current[index] = el;
                                ref.current = el;
                            }}
                            className="snap-center h-screen flex items-center justify-center px-4"
                        >
                            <div className={`w-full md:w-2/4 h-[100vh] bg-[#f0e9df]/80 backdrop-blur-md shadow-lg p-10 flex flex-col justify-center`}>
                                <div className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}>
                                    
                                    {/* Ikon */}
                                    <div className="w-30 h-30 flex-shrink-0">
                                        <img
                                            src={icons[index]}
                                            alt={steps[index]}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {/* Tekst */}
                                    <div className="flex flex-col text-center md:text-left items-center md:items-start space-y-2 max-w-xl">
                                        <h2 className="text-xl font-semibold text-[#047464]">{steps[index]}</h2>
                                        <div className="text-lg text-gray-800 font-sans">{contents[index]}</div>
                                    </div>
                                </div>
                            </div>

                        </section>
                    );
                })}
            </div>
    
            {/* Pil – fast nederst */}
            {activeIndex < steps.length - 1 && (
                <motion.div
                    key={activeIndex}
                    initial={{ y: 0 }}
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer"
                    onClick={() => {
                        const next = sectionRefs.current[activeIndex + 1];
                        if (next) {
                            next.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                    }}
                >
                    <ChevronDown className="w-10 h-10 text-[#047464]" />
                </motion.div>
            )}
        </div>
    );
    
    
    
    
    
};

export default SalesProcessPage;
