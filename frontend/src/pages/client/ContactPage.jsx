import React, { useState } from "react";
import api, { API_ENDPOINTS } from "../../../api/api.js";
// import { useNavigation } from "react-router-dom";

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
        <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-primary text-center">Kontakt oss</h1>
            <p className="mb-4 text-center text-gray-700">Har du spørsmål, ris eller ros? Fyll ut skjemaet nedenfor!</p>

            {/* TODO: Legge til kontaktskjema her? */}
            {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-600 text-center mb-4">{errorMessage}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-4">Navn:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-4">E-post:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label htmlFor="phoneNum" className="block text-gray-700 text-sm font-bold mb-4">Telefonnummer:</label>
                    <input
                        type="tel"
                        id="phoneNum"
                        name="phoneNum"
                        value={formData.phoneNum}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label htmlFor="text" className="block text-gray-700 text-sm font-bold mb-2">Din melding:</label>
                    <textarea
                        id="text"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="shadow appearance-none border rounded w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded focus:outline-none focus:shadow-outline w-full"
                >
                    Send melding
                </button>
            </form>
        </div>
    )
}

export default ContactPage;