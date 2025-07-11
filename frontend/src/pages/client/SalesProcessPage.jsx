import React, {useState, useEffect, useRef} from "react";
import ScrollIndicator from "./ScrollIndicator";
import { CodeSquare } from "lucide-react";
import { useAsyncError } from "react-router-dom";

const SalesProcessPage = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = sectionRefs.current.indexOf(entry.target);
                        if (index !== -1 ) {
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

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-primary">Vår Salgprosess</h1>

    }, []);

    
    return (
        <>
            <ScrollIndicator activeIndex={activeIndex} />
            <div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
                <section
                    ref = {(el) => (sectionRefs.current[0] = el)}
                    className="snap-center h-screen flex items-center justify-center bg-white px-4"
                    data-aos="fade-up"
                    data-aos-delay="0"
                >
                    <div className="max-w-3xl text-center">
                        <h1 className="text-3xl font-bold mb-4 text-[#047464]">Vår Salgprosess</h1>
                        <p className="text-lg text-gray-800">
                            Kjernen i vårt konsept oppsummeres i slagordet « <strong>sammen på rett vei</strong> »
                            da vi forener det beste fra en privat handel og tryggheten ved et forhandlersalg.
                        </p>
                    </div>
                </section>
                <section 
                    ref = {(el) => (sectionRefs.current[1] = el)}
                    className="snap-center h-screen flex items-center justify-center bg-gray-50 px-4"
                    data-aos="fade-up" 
                    data-aos-delay="100"   
                >
                    <div className="max-w-3xl text-center" >
                        <h2 className="text-2xl font-semibold text-[#047464] mb-4">Slik starter det</h2>
                        <p className="text-lg text-gray-800">
                            Når du vurderer å selge bobilen din, starter vi prosessen sammen – alltid på dine premisser. 
                            Vårt konsept bygger på trygghet og enkelhet. Som bileier får du en uforpliktende vurdering 
                            ved å sende oss informasjon om bilen din, inkludert merke, årsmodell, km-stand og utstyr.
                        </p>
                    </div>
                </section>
                <section 
                    ref = {(el) => (sectionRefs.current[2] = el)}                
                    className="snap-center h-screen flex items-center justify-center bg-white px-4"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <div className="max-w-3xl text-center">
                        <h2 className="text-2xl font-semibold text-[#047464] mb-4">Vurdering og annonsering</h2>
                        <p className="text-lg text-gray-800">
                            Etter at vi har mottatt informasjon om bilen, gjør vi en vurdering og gir deg et tilbud 
                            som tilsvarer hva du kunne fått i et privatsalg, men med langt mindre arbeid for deg. 
                            Du bidrar med bilder og detaljer, og vi utformer en annonse som publiseres i vårt navn 
                            som forhandler.
                        </p>
                    </div>
                </section>
                <section 
                    ref = {(el) => (sectionRefs.current[3] = el)}
                    className="snap-center h-screen flex items-center justify-center bg-gray-50 px-4"
                    data-aos="fade-up" 
                    data-aos-delay="300"   
                >
                    <div className="max-w-3xl text-center">
                        <h2 className="text-2xl font-semibold text-[#047464] mb-4">Kontakt og visning</h2>
                        <p className="text-lg text-gray-800">
                            Når interessenter melder seg, setter vi dem i kontakt med deg som eier. 
                            Dere avtaler visning direkte, og du kan fortsatt bruke bilen fritt frem til salg. 
                            Om ønskelig kan vi hjelpe med å tilrettelegge visningen.
                        </p>
                    </div>
                </section>
                <section 
                    ref = {(el) => (sectionRefs.current[4] = el)}
                    className="snap-center h-screen flex items-center justify-center bg-white px-4"
                    data-aos="fade-up" 
                    data-aos-delay="400"   
                >
                    <div className="max-w-3xl text-center">
                        <h2 className="text-2xl font-semibold text-[#047464] mb-4">Trygt salg og oppgjør</h2>
                        <p className="text-lg text-gray-800">
                            Når kjøper og selger er enige, håndterer vi alt det formelle. 
                            Vi utarbeider avtaler, sender inn salgsmelding og sørger for et trygt, mellomliggende oppgjør. 
                            Vi sikrer at prosessen er trygg for begge parter.
                        </p>
                    </div>
                </section>
                <section 
                    ref = {(el) => (sectionRefs.current[5] = el)}
                    className="snap-center h-screen flex items-center justify-center bg-gray-100 px-4"
                    data-aos="fade-up" 
                    data-aos-delay="500"   
                >
                    <div className="max-w-3xl text-center">
                        <h2 className="text-2xl font-semibold text-[#047464] mb-4">Garanti og trygghet</h2>
                        <p className="text-lg text-gray-800">
                            Vi tilbyr garanti til kjøperen, og kjøpet annonseres ut fra oss som forhandler. 
                            Dette gir økt forutsigbarhet og trygghet for ny eier. 
                            Skulle det oppstå problemer, er det vi som står ansvarlige for eventuelle reklamasjoner.
                        </p>
                    </div>
                </section>
                <section 
                    ref = {(el) => (sectionRefs.current[6] = el)}
                    className="snap-center h-screen flex items-center justify-center bg-white px-4"
                    data-aos="fade-up" 
                    data-aos-delay="600"  
                >
                    <div className="max-w-3xl text-center">
                        <h2 className="text-2xl font-semibold text-[#047464] mb-4">Bileiers rolle</h2>
                        <p className="text-lg text-gray-800 mb-4">
                            Bileier bidrar med bilder og informasjon til annonsen. Ved behov sørger bileier for 
                            kontroll av bilen – som fukttest, EU-kontroll eller service.
                        </p>
                        <p className="text-lg text-gray-800">
                            Bileier viser som regel bilen selv, og beholder full disposisjon over den fram til visning 
                            med interessert kjøper – med mindre annet avtales.
                        </p>
                    </div>
                </section>
                <section 
                    ref = {(el) => (sectionRefs.current[7] = el)}
                    className="snap-center h-screen flex items-center justify-center bg-gray-50 px-4"
                    data-aos="fade-up" 
                    data-aos-delay="700"   
                >
                    <div className="max-w-3xl text-center">
                        <h2 className="text-2xl font-semibold text-[#047464] mb-4">Rådgivning ved bilkjøp</h2>
                        <p className="text-lg text-gray-800">
                            De fleste handler skjer med biler i vår portefølje, men vi hjelper deg også gjerne
                            ved kjøp av bil fra andre aktører. Vi tilbyr kjøpsråd, bistand i prisforhandling og 
                            generell rådgivning som gjør handelen enklere og tryggere.
                        </p>
                    </div>
                </section>
                <section 
                    ref = {(el) => (sectionRefs.current[8] = el)}
                    className="snap-center h-screen flex items-center justify-center bg-white px-4"
                    data-aos="fade-up"
                    data-aos-delay="800"    
                >
                    <div className="max-w-3xl text-center">
                        <h2 className="text-2xl font-semibold text-[#047464] mb-4">Ønsker du en vurdering?</h2>
                        <p className="text-lg text-gray-800 mb-4">
                            Har du en bil du ønsker vår uforpliktende vurdering av? Send en e-post til <a href="mailto:peb@abcdeal.no" className="text-blue-600 underline">peb@abcdeal.no</a> med informasjon om:
                        </p>
                        <div className="text-left text-gray-700 text-lg space-y-2 max-w-md mx-auto">
                            <p>• Merke</p>
                            <p>• Årsmodell</p>
                            <p>• Kilometerstand</p>
                            <p>• Utstyr (f.eks. girtype, solcelle, lithiumbatteri, støtteben, AC i bodel, vinterhjul)</p>
                        </div>
                        <p className="mt-6 text-lg text-gray-800">
                            Vi sender deg et uforpliktende tilbud basert på vår selvfinansierte modell for et enklere og tryggere salg.
                        </p>
                    </div>
                </section>
            </div>
        
        </>
    )
}

export default SalesProcessPage;