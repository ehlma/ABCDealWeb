import React, { useState, useEffect, useRef } from "react";
import ScrollIndicator from "./ScrollIndicator";
import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import backgroundImage from "../../assets/salesprocess/backgroundImage.jpg";

const bodyTextColor = "text-[#F8F9FA]";

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
                Har du en bil du ønsker vår uforpliktende vurdering av? Send en e-post til{" "}
                <a href="mailto:peb@abcdeal.no" className="text-blue-600 underline">peb@abcdeal.no</a> med informasjon om:
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
    <div className="flex h-screen overflow-hidden">
        <img
            src={backgroundImage}
            alt="Background"
            className="fixed inset-0 w-full h-full object-cover z-0 blur-sm"
            />
            
        {/* === Sticky side panel === */}
            <aside className="hidden md:flex fixed left-0 top-0 w-1/3 h-screen bg-white/80 backdrop-blur-sm flex-col justify-between items-center z-20 border-r border-gray-200">
            
            {/* Øverste innhold */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#047464] text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                    {activeIndex}
                </div>
                <h2 className="text-2xl font-semibold text-[#047464]">
                    {steps[activeIndex]}
                </h2>
            </div>

            {/* Nederst pil */}
            <motion.div
                key={activeIndex}
                initial={{ y: 0 }}
                animate={{
                    y: [0, 12, 0],
                    opacity: activeIndex === steps.length - 1 ? 0 : 1
                }}
                transition={{
                    duration: 1,
                    ease: "easeInOut",
                }}
                className="mb-8 flex justify-center"
                >
                <ChevronDown className="w-10 h-10 text-[#047464]" />
            </motion.div>
        </aside>

        {/* === Scrollable content === */}
        <main className="ml-[33.3333%] flex-1 relative overflow-y-scroll snap-y snap-mandatory hide-scrollbar scroll-smooth">
                {/* ScrollIndicator på høyre side */}
            <div className="fixed top-0 right-6 h-screen flex flex-col items-center justify-between z-20">
                <ScrollIndicator
                    activeIndex={activeIndex}
                    sectionRefs={sectionRefs}
                    steps={steps}
                />
            </div>
        {steps.map((label, index) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { amount: 0.3 });

          return (
            <motion.section
                key={index}
                ref={(el) => {
                    sectionRefs.current[index] = el;
                    ref.current = el;
                }}
                className="snap-center h-screen flex items-center justify-center px-8"
                animate={{
                    opacity: isInView ? 1 : 0.2,
                    filter: isInView ? "blur(0px)" : "blur(4px)"
                }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-2xl text-left text-white bg-transparent backdrop-blur-md p-6 rounded-lg shadow-lg">
                    <div className="space-y-4 text-[#F8F9FA]">
                        {contents[index]}
                    </div>
                </div>

            </motion.section>
          );
        })}
      </main>
    </div>
  );
};

export default SalesProcessPage;
