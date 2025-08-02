import React, { useState } from "react";
import api, { API_ENDPOINTS } from "../../../api/api.js";
// import { useNavigation } from "react-router-dom";
import contactImage from "../../assets/contactImgs/customer-service-desk.jpg";

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
            <section className="relative w-full max-w-5xl mx-auto mt-12 mb-12">
                <div className="flex flex-col md:flex-row rounded-lg shadow-md overflow-hidden">
                    <div className="md:w-1/2">
                        <img
                            src={contactImage}
                            alt="Bilde av campingbiler ved sjøen."
                            className="w-full h-full object-cover rounded-l-lg rounded-r-none"
                        />
                    </div>

                    <div className="md:w-1/2 p-12 rounded-r-lg rounded-l-none flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-4 text-primary text-center">Lurer du på noe?</h2>
                        <p className="mb-4 text-center text-gray-700">
                            Gjennom kontaktskjema kommer du raskt i kontakt med oss. Vi ser frem til å høre fra deg!
                        </p>
                    </div>
                </div>
            </section >

            <section className="flex flex-col md:flex-row gap-12 max-w-5xl w-full mx-auto mt-8">
                {/* <h1 className="text-3xl font-bold mb-4 text-primary text-center">Kontakt oss</h1>
                <p className="mb-4 text-center text-gray-700">Har du spørsmål, ris eller ros? Fyll ut skjemaet nedenfor!</p> */}

                <div className="md:w-1/2 text-left">
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
                                className="shadow-sm appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight placeholder-gray-300 focus:outline-none  focus:ring-2 focus:ring-gray-200 focus:border-transparent"
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
                                className="shadow-sm appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight placeholder-gray-300 focus:outline-none  focus:ring-2 focus:ring-gray-200 focus:border-transparent"
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
                                className="shadow-sm appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight placeholder-gray-300 focus:outline-none  focus:ring-2 focus:ring-gray-200 focus:border-transparent"
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
                                className="shadow-sm appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight placeholder-gray-300 focus:outline-none  focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-primary shadow-sm hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg shadow transition w-full md:w-auto block focus:outline-none focus:shadow-outline w-full"
                        >
                            Send melding
                        </button>
                    </form>
                </div>
                <div className="md:w-1/2 p-6 space-y-4">
                    <h3 className="texg-lg font-semibold text-gray-700">Kontaktinformasjon</h3>
                    <p><span className="font-medium">Telefon:</span> <a href="#" className="text-primary hover:underline"><br/>+47 47 15 11 11</a></p>
                    <p><span className="font-medium">E-post:</span> <a href="#" className="text-primary hover:underline"><br/>#</a></p>
                    <p><span className="font-medium">Adresse:</span><br/>Spelhaugen 22 A, 5147 Fyllingsdalen</p>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1973.5341550290277!2d5.270963777437207!3d60.353813475126564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463cfbb9107a3d8d%3A0x7b4f7f68fa381569!2sSpelhaugen%2022A%2C%205147%20Fyllingsdalen!5e0!3m2!1sen!2sno!4v1754051896972!5m2!1sen!2sno"
                        className="w-full h-40 rounded"
                        loading="lazy"
                        title="Google Maps"
                    ></iframe>

                </div>
            </section>
        </div >
    )
}

export default ContactPage;