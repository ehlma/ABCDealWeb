import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { API_ENDPOINTS } from "../../../api/api.js";

const ComplaintsPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNum: "",
        regNum: "",
        description: "",
        visibleDamage: false
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedDocs, setSelectedDocs] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === "image") {
            setSelectedImage(files[0]);
        } else if (name === "documentation") {
            setSelectedDocs(Array.from(files));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        // Betinget validering
        if (formData.visibleDamage && !selectedImage) {
            setErrorMessage("Bilde av skaden er obligatorisk når du markerer synlig skade.");
            return;
        }

        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phoneNum", formData.phoneNum);
        data.append("regNum", formData.regNum);
        data.append("description", formData.description);
        data.append("visibleDamage", formData.visibleDamage);

        if (selectedImage) {
            data.append("image", selectedImage);
        }

        selectedDocs.forEach((doc) => {
            data.append("documentation", doc);
        });

        try {
            await api.post(API_ENDPOINTS.complaintSubmit, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setSuccessMessage("Din reklamasjon er sendt! Vi kontakter deg snart.");
            setTimeout(() => navigate("/"), 3000);
        } catch (error) {
            console.error("Feil ved innsending av reklamasjon: ", error);
            setErrorMessage("Kunne ikke sende reklamasjon. Vennligst prøv igjen senere.");
        }
    };

    return (
        <div className="p-8 max-w-lg mx-auto mt-24">
            <h1 className="text-3xl font-bold mb-4 text-primary text-left">Reklamasjonsskjema</h1>

            {/* TODO: Legg til skjema */}
            <p className="mb-6 text-gray-800 leading-relaxed text-left">
                <strong>Slik sender du inn reklamasjon</strong><br />
                Vi tar reklamasjoner på alvor og vil hjelpe deg så raskt som mulig. For å kunne behandle saken effektivt, trenger vi litt informasjon fra deg: bilens registreringsnummer, en beskrivelse av problemet og eventuelt dokumentasjon som bilder eller rapporter fra verksted. <br /><br />
                Alt sendes inn via skjemaet nedenfor – og du får alltid svar skriftlig fra oss.
            </p>

            {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-600 text-center mb-4">{errorMessage}</p>}

            {/* Personlig info */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Steg 1. Navn */}
                <div className="text-left">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Navn:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    {/* Steg 2: E-post */}
                    {/* {formData.name && ( */}
                        <div>
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">E-post:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    {/* )} */}

                    {/* Steg 3: Telefonnummer */}
                    {/* {formData.email && ( */}
                        <div>
                            <label htmlFor="phoneNum" className="block text-gray-700 text-sm font-bold mb-2">Telefonnummer:</label>
                            <input
                                type="tel"
                                id="phoneNum"
                                name="phoneNum"
                                value={formData.phoneNum}
                                onChange={handleChange}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    {/* )} */}

                    {/* Steg 4. Reg nummer */}
                    {/* {formData.phoneNum && ( */}
                        <div>
                            <label htmlFor="regNum" className="block text-gray-700 text-sm font-bold mb-2">Registreringsnummer:</label>
                            <input
                                type="text"
                                id="regNum"
                                name="regNum"
                                value={formData.regNum}
                                onChange={handleChange}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    {/* )} */}

                    {/* Steg 5. Beskrivelse */}
                    {/* {formData.regNum && ( */}
                        <div>
                            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Beskrivelse av problem/skade</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    {/* )} */}

                    {/* Steg 6. Synlig skade */}
                    {/* {formData.description && ( */}
                        <div>
                            <div className="flex items-center space-x-2 pt-4">
                                <input
                                    type="checkbox"
                                    id="visibleDamage"
                                    name="visibleDamage"
                                    onChange={handleChange}
                                    className="form-checkbox h-4 w-4 text-primary"
                                />
                                <label htmlFor="visibleDamage" className="text-gray-700 text-sm">Er skaden synlig?</label>
                            </div>
                        </div>
                    {/* )} */}
                </div>

                {/* Steg 7. Bildeopplasting */}
                {formData.visibleDamage && (
                    <div>
                        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                            Bilde av skaden: <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                )}

                {/* Steg 8. Bildeopplasting */}
                {/* {formData.description && ( */}
                    <div>
                        <label htmlFor="documentation" className="block text-gray-700 text-sm font-bold mb-2">
                            Last opp dokumentasjon
                        </label>
                        <input
                            type="file"
                            id="documentation"
                            name="documentation"
                            multiple
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                {/* )} */}

                {/* Submit-knapp */}
                <div className="mt-6">
                    <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                        Send inn →
                    </button>
                </div>



                {/* Skadebeskrivelse og vedlegg */}

            </form>
        </div>
    )
}

export default ComplaintsPage;