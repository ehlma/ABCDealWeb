import React, { useState } from "react";
import api, { API_ENDPOINTS } from "../../../api/api.js";
// import { useNavigation } from "react-router-dom";
import contactImage from "../../assets/contactImgs/contact.png";

const ContactPage = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNum: "",
        text: "",
    });

    // const[selectedFile, setSelectedFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const handleFileChange = (e) => {
    //     setSelectedFile(e.target.files[0]); // Lagrer den valgte filen
    // };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Forhindrer standsrd side-refresh
        setSuccessMessage(""); // Nullstill meldinger
        setErrorMessage("");

        // Opprette FormData-objekt for å sende tekst og fil
        // const data = new FormData();
        // data.append("name", formData.name);
        // data.append("email", formData.email);
        // data.append("phoneNum", formData.phoneNum);
        // data.append("text", formData.text);

        // if (selectedFile) {
        //     // Legg til filen under navnet "image" for å matche backend-schema
        //     data.append("image", selectedFile);
        // }

        try {
            // Sende POST-forespørsel til den offentlige kontaktruten
            await api.post(API_ENDPOINTS.contactSubmit, formData);

            setSuccessMessage("Din melding er sendt! Vi kontakter deg snart.");
            setFormData({ name: "", email: "", phoneNum: "", text: "" });
            // setSelectedFile(null);
        } catch (error) {
            console.error("Feil ved innsending av kontaktskjema.", error);
            setErrorMessage("Kunne ikke sende melding. Vennligst prøv igjen senere.");
        }
    };


    return (
        <div className="p-24">
            <section className="relative w-full max-w-4xl mx-auto mt-12 mb-24">
                <div className="flex flex-col md:flex-row rounded-lg shadow-md overflow-hidden">
                    <div className="md:w-1/2">
                        <img
                            src={contactImage}
                            alt="Bilde av campingbiler ved sjøen."
                            className="w-full h-full object-cover rounded-l-lg rounded-r-none"
                        />
                    </div>

                    <div className="md:w-1/2 p-12 bg-warm-off-white rounded-r-lg rounded-l-none flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-4 text-primary text-center">Skriv til oss i dag!</h2>
                        <p className="mb-4 text-center text-gray-700">
                            Har du spørsmål om våre bobiler, eller andre spørsmål? Fyll ut kontaktskjemaet nedenfor, så tar vi kontakt med deg så snart som mulig. Vi ser frem til å hjelpe deg!
                        </p>
                    </div>
                </div>
            </section >


            <section className="flex flex-col md:flex-row gap-12 max-w-5xl w-full mx-auto mt-24">
                {/* <h1 className="text-3xl font-bold mb-4 text-primary text-center">Kontakt oss</h1>
                <p className="mb-4 text-center text-gray-700">Har du spørsmål, ris eller ros? Fyll ut skjemaet nedenfor!</p> */}



                <div className="md:w-1/2 text-left">
                    <section className="text-left max-w-lg mb-12">
                        <h2 className="text-primary font-semibold text-xl">Kontaktskjema</h2>
                        <p className="">Skriv noe om forventet svartid, hva vi kan hjelpe med osv.</p>
                    </section>
                    {/* TODO: Legge til kontaktskjema her? */}
                    {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
                    {errorMessage && <p className="text-red-600 text-center mb-4">{errorMessage}</p>}

                    <form onSubmit={handleSubmit} className="grid gap-y-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-1">Navn*</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Ola Nordmann"
                                className="shadow-sm appearance-none border rounded w-full py-2 px-2 bg-warm-off-white text-gray-700 leading-tight placeholder-gray-300 focus:outline-none  focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-1">E-post*</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="ola@nordmann.no"
                                className="shadow-sm appearance-none border rounded w-full py-2 px-2 bg-warm-off-white text-gray-700 leading-tight placeholder-gray-300 focus:outline-none  focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label htmlFor="phoneNum" className="block text-gray-700 text-sm font-bold mb-1">Telefonnummer*</label>
                            <input
                                type="tel"
                                id="phoneNum"
                                name="phoneNum"
                                value={formData.phoneNum}
                                onChange={handleChange}
                                required
                                placeholder="+47 12345678"
                                className="shadow-sm appearance-none border rounded w-full py-2 px-2 bg-warm-off-white text-gray-700 leading-tight placeholder-gray-300 focus:outline-none  focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label htmlFor="text" className="block text-gray-700 text-sm font-bold mb-1">Din melding*</label>
                            <textarea
                                id="text"
                                name="text"
                                value={formData.text}
                                onChange={handleChange}
                                required
                                placeholder="Skriv din melding her..."
                                rows="5"
                                className="shadow-sm appearance-none border rounded w-full py-2 px-2 bg-warm-off-white text-gray-700 leading-tight placeholder-gray-300 focus:outline-none  focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                            ></textarea>
                        </div>
                        <div className="flex">
                            <button
                                type="submit"
                                className="bg-primary shadow-sm hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-xl transition md:w-auto block focus:outline-none focus:shadow-outline w-full max-w-fit"
                            >
                                Send melding
                            </button>
                        </div>
                    </form>
                </div>
                <div className="md:w-1/2 p-6 space-y-4">
                    <h3 className="texg-lg font-semibold text-gray-700">Kontaktinformasjon</h3>
                    <p><span className="font-medium">Telefon:</span> <a href="#" className="text-primary hover:underline"><br />+47 408 28 494</a></p>
                    <p><span className="font-medium">E-post:</span> <a href="#" className="text-primary hover:underline"><br />tommy@3sbc.no</a></p>
                    <p><span className="font-medium">Foretningsadresse:</span> <a href="#" className="text-primary hover:underline"><br />Siriusveien 9, 1407 Vinterbro</a></p>
                    <iframe
                        src="https://maps.google.com/maps?q=Siriusveien%209,%201407%20Vinterbro&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        className="w-full h-64 rounded-xl shadow-sm"
                        loading="lazy"
                        title="3S Bobil & Caravan"
                    ></iframe>

                </div>
            </section>
        </div >
    )
}

export default ContactPage;