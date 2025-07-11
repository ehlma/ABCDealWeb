import React, { useState, useEffect, useRef } from "react";
import ScrollIndicator from "./ScrollIndicator";
import { motion } from "framer-motion"; // ✅ Nytt: framer-motion

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
    <h1 className="text-3xl font-bold mb-4 text-[#047464]">Vår Salgprosess</h1>
    <p className="text-lg text-gray-800">
      Kjernen i vårt konsept oppsummeres i slagordet «<strong>sammen på rett vei</strong>»
      da vi forener det beste fra en privat handel og tryggheten ved et forhandlersalg.
    </p>
  </>,
  <>
    <h2 className="text-2xl font-semibold text-[#047464] mb-4">Slik starter det</h2>
    <p className="text-lg text-gray-800">
      Når du vurderer å selge bobilen din, starter vi prosessen sammen – alltid på dine premisser. Vårt konsept bygger på trygghet og enkelhet. Som bileier får du en uforpliktende vurdering ved å sende oss informasjon om bilen din, inkludert merke, årsmodell, km-stand og utstyr.
    </p>
  </>,
  <>
    <h2 className="text-2xl font-semibold text-[#047464] mb-4">Vurdering og annonsering</h2>
    <p className="text-lg text-gray-800">
      Etter at vi har mottatt informasjon om bilen, gjør vi en vurdering og gir deg et tilbud som tilsvarer hva du kunne fått i et privatsalg, men med langt mindre arbeid for deg. Du bidrar med bilder og detaljer, og vi utformer en annonse som publiseres i vårt navn som forhandler.
    </p>
  </>,
  <>
    <h2 className="text-2xl font-semibold text-[#047464] mb-4">Kontakt og visning</h2>
    <p className="text-lg text-gray-800">
      Når interessenter melder seg, setter vi dem i kontakt med deg som eier. Dere avtaler visning direkte, og du kan fortsatt bruke bilen fritt frem til salg. Om ønskelig kan vi hjelpe med å tilrettelegge visningen.
    </p>
  </>,
  <>
    <h2 className="text-2xl font-semibold text-[#047464] mb-4">Trygt salg og oppgjør</h2>
    <p className="text-lg text-gray-800">
      Når kjøper og selger er enige, håndterer vi alt det formelle. Vi utarbeider avtaler, sender inn salgsmelding og sørger for et trygt, mellomliggende oppgjør. Vi sikrer at prosessen er trygg for begge parter.
    </p>
  </>,
  <>
    <h2 className="text-2xl font-semibold text-[#047464] mb-4">Garanti og trygghet</h2>
    <p className="text-lg text-gray-800">
      Vi tilbyr garanti til kjøperen, og kjøpet annonseres ut fra oss som forhandler. Dette gir økt forutsigbarhet og trygghet for ny eier. Skulle det oppstå problemer, er det vi som står ansvarlige for eventuelle reklamasjoner.
    </p>
  </>,
  <>
    <h2 className="text-2xl font-semibold text-[#047464] mb-4">Bileiers rolle</h2>
    <p className="text-lg text-gray-800 mb-4">
      Bileier bidrar med bilder og informasjon til annonsen. Ved behov sørger bileier for kontroll av bilen – som fukttest, EU-kontroll eller service.
    </p>
    <p className="text-lg text-gray-800">
      Bileier viser som regel bilen selv, og beholder full disposisjon over den fram til visning med interessert kjøper – med mindre annet avtales.
    </p>
  </>,
  <>
    <h2 className="text-2xl font-semibold text-[#047464] mb-4">Rådgivning ved bilkjøp</h2>
    <p className="text-lg text-gray-800">
      De fleste handler skjer med biler i vår portefølje, men vi hjelper deg også gjerne ved kjøp av bil fra andre aktører. Vi tilbyr kjøpsråd, bistand i prisforhandling og generell rådgivning som gjør handelen enklere og tryggere.
    </p>
  </>,
  <>
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
  </>
];

const SalesProcessPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

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
    <>
      <ScrollIndicator activeIndex={activeIndex} sectionRefs={sectionRefs} steps={steps} />
      <div className="fixed inset-0 z-10 snap-y snap-mandatory overflow-y-scroll hide-scrollbar scroll-smooth">
        {steps.map((label, index) => (
          <section
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={`snap-center h-screen flex items-center justify-center ${
              index % 2 === 0 ? "bg-white" : "bg-white"
            } px-4`}
          >
            <motion.div
              className="max-w-3xl text-center sm:text-left pr-12 sm:pr-24"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.6 }}
            >
              {contents[index]}
            </motion.div>
          </section>
        ))}
      </div>
    </>
  );
};

export default SalesProcessPage;
