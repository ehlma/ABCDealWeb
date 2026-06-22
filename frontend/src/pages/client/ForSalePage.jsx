import { useEffect } from "react";

const ForSalePage = () => {

    useEffect(() => {
        document.title = "Til salgs | 3S Bobil & Caravan";

        let metaDescription = document.querySelector('meta[name="description"]');

        if (!metaDescription) {
            metaDescription = document.createElement("meta");
            metaDescription.name = "description";
            document.head.appendChild(metaDescription);
        }

        metaDescription.content =
            "Se aktuelle bobiler og campingvogner til salgs hos 3S Bobil & Caravan. Finn våre annonser og få hjelp gjennom hele kjøpsprosessen.";
    }, []);

    return (
        <>
            <section className="flex flex-col items-center px-4 custom:px-6 lg:px-8 pt-32 pb-20 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Bobiler og campingvogner til salgs</h1>
                <p className="text-base md:text-lg text-gray-700 mb-8 max-w-xl">
                    Hos 3S Bobil & Caravan finner du aktuelle bobiler og campingvogner til salgs. Alle våre annonser publiseres på Finn.no, hvor du kan se tilgjengelige objekter og ta kontakt dersom du er interessert.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href="https://www.finn.no/mobility/search/car/mobilehome?orgId=8250738"
                        // target="_blank"
                        // rel="noopener noreferrer"
                        className="inline-block rounded-full bg-primary text-white px-8 py-3 text-lg font-medium shadow-md hover:bg-primary-dark transition-all duration-300"
                    >
                        Se biler på Finn.no
                    </a>
                </div>

                <section className="mt-16 max-w-3xl">
                    <div className="rounded-2xl bg-warm-off-white shadow-sm border border-gray-100 p-8 text-left">
                        <h2 className="text-2xl font-semibold text-primary mb-6">
                            Trygg handel med personlig oppfølging
                        </h2>

                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                Vi hjelper kunder over hele Norge med kjøp og salg av bobil og campingvogn. Målet vårt er å gjøre prosessen så trygg, enkel og forutsigbar som mulig.
                            </p>

                            <p>
                                Alle objekter kvalitetssikres før annonsering, og vi bistår gjennom hele prosessen – fra første kontakt og visning til kontrakt, overlevering og oppfølging.
                            </p>

                            <p>
                                Dersom du ikke finner det du leter etter blant dagens annonser, er du velkommen til å kontakte oss for hjelp og rådgivning.
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                            <p className="text-gray-700 mb-4">
                                Finner du ikke det du leter etter, eller ønsker du hjelp med salg av din egen bobil?
                            </p>

                            <a
                                href="/contact"
                                className="inline-block rounded-full border-2 border-primary text-primary px-6 py-3 font-medium hover:bg-primary hover:text-white transition-all duration-300"
                            >
                                Kontakt oss
                            </a>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}

export default ForSalePage;