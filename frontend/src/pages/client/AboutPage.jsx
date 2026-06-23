import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import tommyImage from "../../assets/tommy.jpg";
import TeamMemberCard from "../../components/TeamMemberCard";
import norwayImage from "../../assets/norway.svg";
import roadmapImage from "../../assets/roadmap.jpg";


const AboutPage = () => {
    const teamData = [
        {
            name: "Tommy Østli",
            title: "Daglig leder og grunnlegger",
            phoneNum: "+47 408 28 4948",
            email: "tommy@3sbc.no",
            image: tommyImage,
            objectPosition: "top 20%",
            description: `Jeg er daglig leder og grunnlegger av 3S Bobil & Caravan AS. Jeg har over 11 års erfaring fra caravanbransjen, og har gjennom karrieren levert bobiler og campingvogner til mer enn 600 fornøyde kunder.

            I tillegg har jeg seks års erfaring som konsulent innen salgsutvikling, ledelse og organisasjonsutvikling. Kombinert med 25 års erfaring som mellomleder og toppleder i norske og skandinaviske selskaper, gir dette meg et solid grunnlag for å levere profesjonelle, trygge og effektive salgsprosesser.

            Filosofien min er enkel: Ting skal gjøres ordentlig, ryddig og forutsigbart. Jeg legger stor vekt på tilgjengelighet, ærlighet og tett oppfølging gjennom hele prosessen, slik at både kjøper og selger sitter igjen med en god opplevelse.

            Gjennom 3S Bobil & Caravan AS – Suksess, Systematisk, Sammen – er målet å skape trygge, gode og lønnsomme opplevelser for alle parter.`
        },
    ]

    // SEO
    useEffect(() => {
        document.title = "Om oss | 3S Bobil & Caravan";

        let metaDescription = document.querySelector(
            'meta[name="description"]'
        );

        if (!metaDescription) {
            metaDescription = document.createElement("meta");
            metaDescription.name = "description";
            document.head.appendChild(metaDescription);
        }
        metaDescription.content =
            "Lær mer om 3S Bobil & Caravan og Tommy Østli. Over 11 års erfaring med kjøp og salg av bobil og campingvogn.";
    }, []);

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mt-24 ml-10 mr-10">

                {/* Intro */}
                <div className="mt-12">
                    <div className="w-full max-w-96 text-left">
                        <h1 className="font-bold text-3xl text-primary">Kjøp og salg av bobil og campingvogn med trygg oppfølging</h1>
                        <p className="mt-4 text-gray-700 text-md max-w-[80vh]">Hos 3S Bobil & Caravan hjelper vi deg med kjøp og salg av bobil og campingvogn. Vi kombinerer bransjeerfaring, personlig oppfølging og tydelige prosesser for å gjøre handelen trygg, enkel og forutsigbar.</p>
                    </div>

                    <div className="mt-4 w-full flex justify-center">
                        <div className="relative w-[80vw] h-[40vh] overflow-hidden rounded-xl">
                            <div className="absolute inset-0 bg-bg-color/20 z-10" />
                            <img
                                src={roadmapImage}
                                alt="Bilde av landevei i Norge"
                                className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {/* Visjon og løfte */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {/* Tom kolonne */}
                    <div />

                    {/* Visjon */}
                    <div className="text-left col-span-1 md:col-span-1">
                        <h1 className=" mb-2 font-semibold text-xl text-primary">Vår visjon</h1>
                        <p className="text-gray-700 text-md max-w-md ml-auto">3S Bobil & Caravan AS er bygget på erfaring, struktur og personlig oppfølging. Vi hjelper privatpersoner med trygt kjøp og salg av bobil og campingvogn, med fokus på ryddige prosesser fra første kontakt til ferdig handel.</p>
                    </div>

                    {/* Løfte */}
                    <div className="text-left col-span-1 md:col-span-1">
                        <h3 className=" mb-2 font-semibold text-xl text-primary">Vårt løfte</h3>
                        <p className="text-gray-700 text-md max-w-md ml-auto">
                            Vårt mål er å gjøre det enkelt for deg å kjøpe eller selge bobil og campingvogn – uten stress og usikkerhet. Vi tar hånd om alt det praktiske, slik at du slipper papirarbeid, annonsering og usikre avtaler.
                        </p>
                    </div>
                </div>

                {/* Metrics */}
                <div className="mt-28 border border-gray-300 rounded-2xl p-6 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-300 text-center">

                        <div className="flex flex-col custom:flex-row items-center justify-center gap-2 p-4 custom:w-auto">
                            <p className="text-4xl text-primary ">200+</p>
                            <div className="ml-2 text-lg text-gray-700 leading-tight">
                                <p>Vellykkede</p>
                                <p>salg</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 p-4 custom:border-gray-300 custom:px-6 ">
                            <p className="text-4xl text-primary">150+</p>
                            <div className="ml-2 text-lg text-gray-700 leading-tight">
                                <p>Fornøyde</p>
                                <p>kunder</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 p-4 custom:border-gray-300 custom:px-6">
                            <p className="text-4xl text-primary">10+</p>
                            <div className="ml-2 text-lg text-gray-700 leading-tight">
                                <p>År med</p>
                                <p>erfaring i bransjen</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Lokal tilstedeværelse */}
                <div className="mt-28 mb-12 grid grid-cols-1 md:grid-cols-[auto_1fr] items-center">
                    <div className="w-max">
                        <img
                            src={norwayImage}
                            alt="Kart over Norge."
                            className="h-80 w-auto"
                        />
                    </div>
                    <div className="text-left max-w-[40vw] mt-5">
                        <h3 className="font-semibold text-xl text-primary mb-2">Alltid i nærheten</h3>

                        <p className="text-gray-700 text-md">
                            Våre ansatte holder til på Vinterbro, men vi har bygget et stort kontaktnett over hele landet. Dette gjør at vi kan tilby raske salg og god eksponering – uansett hvor i Norge du holder til.
                        </p>
                    </div>
                </div>
            </div>

            {/* Team member cards */}
            <h1 className="text-2xl font-bold text-primary m-12 mt-24">Møt 3S Bobil & Caravan</h1>
            <div className="flex justify-center">
                <div className="w-full max-w-2xl">
                    {teamData.map((member) => (
                        <TeamMemberCard key={member.name} {...member} />
                    ))}
                </div>
            </div>

            {/* Om 3s */}
            <section className="max-w-4xl mx-auto mt-24 text-left">
                <h2 className="text-2xl font-bold text-primary mb-6">
                    Om 3S Bobil & Caravan AS
                </h2>

                <div className="space-y-4 text-gray-700">
                    <p>
                        3S står for Suksess, Systematisk, Sammen. Dette er grunnlaget for
                        hvordan vi arbeider hver eneste dag.
                    </p>

                    <p>
                        Vi vet at kjøp og salg av bobil handler om mer enn økonomi.
                        Det handler om trygghet, tillit og gode opplevelser. Derfor
                        legger vi stor vekt på struktur, gode prosesser og tett
                        oppfølging gjennom hele handelen.
                    </p>

                    <p>
                        Hos oss får du det beste fra to verdener: profesjonaliteten til
                        en seriøs aktør og nærheten til en personlig rådgiver. Målet er
                        å gjøre kjøp og salg av bobil og campingvogn så trygt, enkelt og
                        forutsigbart som mulig.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="mt-24 rounded-2xl bg-primary-light p-10 text-center">
                <h2 className="text-2xl font-bold text-primary">
                    Klar for å kjøpe eller selge bobil?
                </h2>

                <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
                    Ta kontakt for en uforpliktende prat. Vi hjelper deg gjennom hele prosessen –

                    fra verdivurdering og markedsføring til salg og overlevering.
                </p>

                <Link
                    to="/contact"
                    className="mt-6 inline-flex items-center rounded-full bg-primary px-6 py-3 text-white font-medium hover:bg-primary-dark transition-colors"
                >
                    Kontakt oss
                </Link>

            </section>
        </div>
    )
}

export default AboutPage;