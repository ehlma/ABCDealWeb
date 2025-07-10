import React from "react";
import logoImage from "../../assets/Logo.png";
import tommyImage from "../../assets/tommy.jpg";
import leifImage from "../../assets/leif.jpg";
import perErikImage from "../../assets/pererik.jpeg";


const AboutPage = () => {
    return (
        <div className="max-w-6xl max-auto p-12">
            <h1 className="text-3xl font-bold mb-8 text-primary">Om Oss</h1>
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/2 space-y-4 text-gray-800">
                    <p className="mb-4">
                        <strong>ABC Deal </strong> 
                        er et selskap med solide røtter og flere tiårs samlet erfaring innen salg, kundebehandling, teknisk support og logistikk. Gjennom vårt eierskap og kompetanse har vi opparbeidet en bred forståelse for både markedet og kundenes behov.
                    </p>
                    <p className="mb-4">
                        Vi samarbeider tett med et stadig voksende nettverk av partnere over hele landet. Dette gjør oss i stand til å bistå våre kunder – enten de befinner seg i nærheten av hjemstedet sitt eller er på reise i vårt vakre og langstrakte land.
                    </p>
                    <p className="mb-4">
                        Gjennom årene har vi tilegnet oss omfattende kunnskap innen bilhold og logistikk, og vi deler gjerne vår erfaring for å sikre at kundene våre får trygge og gode løsninger.
                    </p>
                    <p className="mb-4">
                        Miljøet står naturlig nok sentralt i vårt arbeid. Vi etterstreber bærekraftige valg i alle ledd, blant annet ved at kjøretøyene vi formidler for våre kunder som regel står hos eier, og dermed unngår unødvendig transport. I tillegg tilbyr vi miljøvennlig utstyr som solcellepaneler og energieffektiv belysning.
                    </p>
                </div>
                <div className="md:w-1/2 flex justify-end self-center">
                    <img 
                        src={logoImage} 
                        alt=""
                        className="rounded shadow-lg max-w-[600px] h-auto object-contain" 
                    />

                </div>
            </div>

            {/* Tommy */}
            <div className="max-w-6xl mx-auto mt-16">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="md:w-1/2 flex justify-center">
                        <img 
                            src={tommyImage} 
                            alt="Bilde. Tommy." 
                            className="rounded shadow-lg max-w-[300px] h-auto object-cover"
                        />

                    </div>
                    <div className="md:w-1/2 ">
                        <h2 className="text-2xl font-bold text-primary">Tommy Østli</h2>
                        <p className="text-sm text-gray-800 mb-6">Daglig leder</p>
                        <p className="mb-4">
                            Tommy er en erfaren selger med en genuin evne til å bygge relasjoner og skape tillit. Med bakgrunn fra både salg og coaching, har han i mange år hjulpet kunder med å finne løsninger som passer deres behov – alltid med en personlig og ærlig tilnærming.
                        </p>
                        <p className="mb-4">
                            Hans engasjement og forståelse for mennesker gjør ham til en naturlig kontaktperson for både nye og eksisterende kunder hos ABC Deal.
                        </p>

                        <div className="text-left text-sm text-gray-700 pt-4 space-y-1">
                            <div className="flex justify-start">
                                <span className="font-medium w-20 text-left">Tlf:</span>
                                <span>+47 408 28 4948</span>
                            </div>
                            <div className="flex justify-start">
                                <span className="font-medium w-20 text-left">E-post: </span>
                                <span>to@abcdeal.no</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Per Erik */}
            <div className="max-w-6xl mx-auto mt-16">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src={perErikImage}
                            alt="Bilde. Per Erik"
                            className="rounded shadow-lg max-w-[300px] h-auto object-cover"
                        />
                    </div>

                    <div className="md:w-1/2">
                        <h2 className="text-2xl font-bold text-primary">Per Erik Bjørk</h2>
                        <p className="text-sm text-gray-800 mb-6">Partner</p>
                        <p className="mb-4">
                            Per Erik er en trygg og stødig ressurs i ABC Deal AS. Han er den typen mennesker man alltid kan stole på – både internt i teamet og ute hos kundene.
                        </p>
                        <p className="mb-4">
                            Med sin rolige væremåte og pålitelige tilstedeværelse bidrar Per Erik til at kundene våre føler seg ivaretatt gjennom hele prosessen.
                        </p>
                        <div className="text-left text-sm text-gray-700 pt-4 space-y-1">
                            <div className="flex justifty-start">
                                <span className="font-medium w-20 text-left">Tlf:</span>
                                <span>+47 479 26 965</span>
                            </div>
                            <div className="flex justify-start">
                                <span className="font-medium w-20 text-left">E-post:</span>
                                <span>peb@abcdeal.no</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* Leif */}
            <div className="max-w-6xl mx-auto mt-16">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src={leifImage}
                            alt="Bilde. Leif"
                            className="rounded shadow-lg max-w-[300px] h-auto object-cover"
                        />
                    </div>

                    <div className="md:w-1/2">
                        <h2 className="text-2xl font-bold text-primary">Leif Jårvik</h2>
                        <p className="text-sm text-gray-800 mb-6">Partner</p>
                        <p className="mb-4">
                            Leif er kjent for sin ærlige og direkte stil. Han er en jordnær og tydelig stemme i ABC Deal AS, og kundene setter pris på hans evne til å si ting som de er – uten unødvendige omveier.
                        </p>
                        <p className="mb-4">
                            Med Leif får du alltid klare råd, ryddige avtaler og en trygg handel. Han er en viktig ressurs både for selskapet og for våre kunder.
                        </p>
                        <div className="text-left text-sm text-gray-700 pt-4 space-y-1">
                            <div className="flex justifty-start">
                                <span className="font-medium w-20 text-left">Tlf:</span>
                                <span>+47 479 17 770</span>
                            </div>
                            <div className="flex justify-start">
                                <span className="font-medium w-20 text-left">E-post:</span>
                                <span>lj@abcdeal.no</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>



            
        </div>
    )
}

export default AboutPage;