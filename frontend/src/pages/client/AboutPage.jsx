import React from "react";
import tommyImage from "../../assets/tommy.jpg";
import TeamMemberCard from "../../components/TeamMemberCard";
import norwayImage from "../../assets/norway.svg";
import roadmapImage from "../../assets/roadmap.jpg";

const AboutPage = () => {
    const teamData = [
        {
            name: "Tommy Østli",
            title: "Daglig leder",
            phoneNum: "+47 408 28 4948",
            email: "tommy@3sbc.no",
            image: tommyImage,
            objectPosition: "top 20%",
            description: "Tommy er en erfaren selger med en genuin evne til å bygge relasjoner og skape tillit. Med bakgrunn fra både salg og coaching, har han i mange år hjulpet kunder med å finne løsninger som passer deres behov – alltid med en personlig og ærlig tilnærming. Hans engasjement og forståelse for mennesker gjør ham til en naturlig kontaktperson for både nye og eksisterende kunder hos ABC Deal.",
        },
    ]

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mt-24 ml-10 mr-10">

                {/* Intro */}
                <div className="mt-12">
                    <div className="max-w-[50] text-left">
                        <h1 className="font-bold text-3xl text-primary">Din reise begynner med oss</h1>
                        <p className="mt-4 text-gray-700 text-md max-w-[80vh]">Hos ABC Deal redefinerer vi måten biler kjøpes og selges på. Vårt oppdrag er å gjøre bilhandel enkel, trygg og skreddersydd - med full åpenhet og personlig oppfølging for hver eneste kunde.</p>
                    </div>

                    <div className="mt-4 w-full flex justify-center">
                        <div className="relative w-[80vw] h-[40vh] overflow-hidden rounded-xl">
                            <div className="absolute inset-0 bg-bg-color/20 z-10" />
                            <img
                                src={roadmapImage}
                                alt="Bilde av landevei."
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
                        <p className="text-gray-700 text-md max-w-md ml-auto">ABC Deal AS ble etablert i 2020 og drives av engasjerte eiere med lang erfaring innen kjøp og salg av bobiler og campingvogner. Vi kombinerer bransjekunnskap med et moderne og kundevennlig konsept.</p>
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
                                <p >Vellykkede</p>
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
                            Våre ansatte holder til både i Bergen og i Oslo, men vi har bygget et stort kontaktnett over hele landet. Dette gjør at vi kan tilby raske salg og god eksponering – uansett hvor i Norge du holder til.
                        </p>
                    </div>
                </div>
            </div>

            {/* Team member cards */}
            <h1 className="text-2xl font-bold text-primary m-12 mt-24">Møt 3S Bobil & Caravan</h1>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-items-center">
                {teamData.map((member) => (
                    <TeamMemberCard key={member.name} {...member} />
                ))}
            </div>
        </div>
    )
}

export default AboutPage;