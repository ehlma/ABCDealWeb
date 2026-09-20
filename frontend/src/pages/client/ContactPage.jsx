import React, { useState, useEffect } from "react";
import api, { API_ENDPOINTS } from "../../../api/api.js";
import contactImage from "../../assets/contactImgs/contact.png";
import "./ContactPage.css";

const ContactPage = () => {
    const [contactType, setContactType] = useState("purchase");

    const initialFormData = {
        name: "",
        email: "",
        phoneNum: "",
        text: "",
        vehicleModel: "",
        yearModel: "",
        mileage: "",
        registrationNumber: "",
        extraEquipment: "",
        knownIssues: "",
        serviceHistory: "",
    };

    const [formData, setFormData] = useState(initialFormData);

    const [densityControlFile, setDensityControlFile] = useState(null);
    const [vehicleImages, setVehicleImages] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDensityControlChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setDensityControlFile(file);
        }
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 10) {
            setErrorMessage("Du kan laste opp maksimalt 10 bilder.");
            e.target.value = "";
            setVehicleImages([]);
            return;
        }

        setErrorMessage("");
        setVehicleImages(files);
    };

    const handleContactTypeChange = (type) => {
        setContactType(type);
        setSuccessMessage("");
        setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");

        try {
            const data = new FormData();

            data.append("contactType", contactType);

            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("phoneNum", formData.phoneNum);

            if (contactType === "purchase") {
                data.append("text", formData.text);
            }

            if (contactType === "sale") {
                data.append("vehicleModel", formData.vehicleModel);
                data.append("yearModel", formData.yearModel);
                data.append("mileage", formData.mileage);
                data.append(
                    "registrationNumber",
                    formData.registrationNumber
                );
                data.append(
                    "extraEquipment",
                    formData.extraEquipment
                );
                data.append(
                    "knownIssues",
                    formData.knownIssues
                );
                data.append(
                    "serviceHistory",
                    formData.serviceHistory
                );

                if (densityControlFile) {
                    data.append(
                        "densityControlFile",
                        densityControlFile
                    );
                }

                vehicleImages.forEach((image) => {
                    data.append("vehicleImages", image);
                });
            }

            await api.post(API_ENDPOINTS.contactSubmit, data);

            setSuccessMessage(
                contactType === "sale"
                    ? "Takk! Informasjonen om bobilen er sendt. Vi kontakter deg snart."
                    : "Din melding er sendt! Vi kontakter deg snart."
            );

            setFormData(initialFormData);
            setDensityControlFile(null);
            setVehicleImages([]);

            const densityInput =
                document.getElementById("densityControlFile");

            const imagesInput =
                document.getElementById("vehicleImages");

            if (densityInput) {
                densityInput.value = "";
            }

            if (imagesInput) {
                imagesInput.value = "";
            }
        } catch (error) {
            console.error(
                "Feil ved innsending av kontaktskjema.",
                error
            );

            setErrorMessage(
                "Kunne ikke sende melding. Vennligst prøv igjen senere."
            );
        }
    };

    useEffect(() => {
        document.title = "Kontakt oss | 3S Bobil & Caravan";

        let metaDescription =
            document.querySelector('meta[name="description"]');

        if (!metaDescription) {
            metaDescription =
                document.createElement("meta");

            metaDescription.name = "description";

            document.head.appendChild(metaDescription);
        }

        metaDescription.content =
            "Kontakt 3S Bobil & Caravan for en uforpliktende prat om kjøp eller salg av bobil og campingvogn. Vi hjelper deg med trygge og ryddige prosesser.";
    }, []);

    return (
        <div className="contact-page">
            <section className="contact-hero">
                <div className="contact-hero__content">
                    <div className="contact-hero__image-wrapper">
                        <img
                            src={contactImage}
                            alt="Bobiler og campingvogner ved sjøen"
                            className="contact-hero__image"
                        />
                    </div>

                    <div className="contact-hero__text">
                        <h1>
                            Kontakt 3S Bobil & Caravan
                        </h1>

                        <p>
                            Har du spørsmål om kjøp eller salg av bobil?
                            Fyll ut kontaktskjemaet nedenfor, så tar vi
                            kontakt med deg så snart som mulig. Vi ser
                            frem til å hjelpe deg.
                        </p>
                    </div>
                </div>
            </section>

            <section className="contact-layout">
                <div className="contact-form-column">
                    <section className="contact-form-intro">
                        <h2>Kontaktskjema</h2>

                    </section>

                    <div className="contact-form-tabs">
                        <button
                            type="button"
                            onClick={() =>
                                handleContactTypeChange("purchase")
                            }
                            className={
                                contactType === "purchase"
                                    ? "active"
                                    : ""
                            }
                        >
                            Jeg vil kjøpe
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                handleContactTypeChange("sale")
                            }
                            className={
                                contactType === "sale"
                                    ? "active"
                                    : ""
                            }
                        >
                            Jeg vil selge
                        </button>
                    </div>

                    {contactType === "purchase" ? (
                        <p className="contact-form-description">
                            Send oss en melding, så svarer vi deg så
                            raskt vi kan.
                        </p>
                    ) : (
                        <div className="contact-form-description">
                            <h3>Fortell oss om bobilen din</h3>

                            <p>
                                Jo mer informasjon vi får, desto bedre
                                kan vi vurdere bobilen og gi deg en god
                                tilbakemelding.
                            </p>
                        </div>
                    )}

                    {successMessage && (
                        <p className="contact-message contact-message--success">
                            {successMessage}
                        </p>
                    )}

                    {errorMessage && (
                        <p className="contact-message contact-message--error">
                            {errorMessage}
                        </p>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="contact-form"
                        encType="multipart/form-data"
                    >
                        <div className="contact-field">
                            <label htmlFor="name">
                                Navn*
                            </label>

                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Ola Nordmann"
                            />
                        </div>

                        <div className="contact-field">
                            <label htmlFor="email">
                                E-post*
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="ola@nordmann.no"
                            />
                        </div>

                        <div className="contact-field">
                            <label htmlFor="phoneNum">
                                Telefonnummer*
                            </label>

                            <input
                                type="tel"
                                id="phoneNum"
                                name="phoneNum"
                                value={formData.phoneNum}
                                onChange={handleChange}
                                required
                                placeholder="+47 12345678"
                            />
                        </div>

                        {contactType === "purchase" && (
                            <div className="contact-field">
                                <label htmlFor="text">
                                    Din melding*
                                </label>

                                <textarea
                                    id="text"
                                    name="text"
                                    value={formData.text}
                                    onChange={handleChange}
                                    required
                                    placeholder="Skriv din melding her..."
                                    rows="5"
                                />
                            </div>
                        )}

                        {contactType === "sale" && (
                            <>
                                <div className="contact-form-section-title">
                                    <h3>
                                        Informasjon om bobilen
                                    </h3>
                                </div>

                                <div className="contact-field">
                                    <label htmlFor="vehicleModel">
                                        Biltype og modell*
                                    </label>

                                    <input
                                        type="text"
                                        id="vehicleModel"
                                        name="vehicleModel"
                                        value={formData.vehicleModel}
                                        onChange={handleChange}
                                        required
                                        placeholder="F.eks. Hymer B-Class 680"
                                    />
                                </div>

                                <div className="contact-field">
                                    <label htmlFor="yearModel">
                                        Årsmodell*
                                    </label>

                                    <input
                                        type="number"
                                        id="yearModel"
                                        name="yearModel"
                                        value={formData.yearModel}
                                        onChange={handleChange}
                                        required
                                        placeholder="F.eks. 2020"
                                        min="1950"
                                        max="2100"
                                    />
                                </div>

                                <div className="contact-field">
                                    <label htmlFor="mileage">
                                        Kilometerstand*
                                    </label>

                                    <input
                                        type="number"
                                        id="mileage"
                                        name="mileage"
                                        value={formData.mileage}
                                        onChange={handleChange}
                                        required
                                        placeholder="F.eks. 45000"
                                        min="0"
                                    />
                                </div>

                                <div className="contact-field">
                                    <label htmlFor="registrationNumber">
                                        Registreringsnummer*
                                    </label>

                                    <input
                                        type="text"
                                        id="registrationNumber"
                                        name="registrationNumber"
                                        value={
                                            formData.registrationNumber
                                        }
                                        onChange={handleChange}
                                        required
                                        placeholder="F.eks. AB12345"
                                    />
                                </div>

                                <div className="contact-field">
                                    <label htmlFor="extraEquipment">
                                        Informasjon om ekstrautstyr*
                                    </label>

                                    <textarea
                                        id="extraEquipment"
                                        name="extraEquipment"
                                        value={formData.extraEquipment}
                                        onChange={handleChange}
                                        required
                                        placeholder="F.eks. markise, solcellepanel, ryggekamera, sykkelstativ..."
                                        rows="4"
                                    />
                                </div>

                                <div className="contact-field">
                                    <label htmlFor="knownIssues">
                                        Kjente feil og mangler*
                                    </label>

                                    <textarea
                                        id="knownIssues"
                                        name="knownIssues"
                                        value={formData.knownIssues}
                                        onChange={handleChange}
                                        required
                                        placeholder="Beskriv eventuelle kjente feil eller mangler. Skriv «Ingen kjente» dersom du ikke kjenner til noen."
                                        rows="4"
                                    />
                                </div>

                                <div className="contact-field">
                                    <label htmlFor="serviceHistory">
                                        Servicehistorikk*
                                    </label>

                                    <textarea
                                        id="serviceHistory"
                                        name="serviceHistory"
                                        value={formData.serviceHistory}
                                        onChange={handleChange}
                                        required
                                        placeholder="Fortell kort om servicehistorikken..."
                                        rows="4"
                                    />
                                </div>

                                <div className="contact-field">
                                    <label htmlFor="densityControlFile">
                                        Dokumentasjon på siste tetthetskontroll*
                                    </label>

                                    <input
                                        type="file"
                                        id="densityControlFile"
                                        name="densityControlFile"
                                        onChange={
                                            handleDensityControlChange
                                        }
                                        required
                                        accept=".pdf,image/jpeg,image/png,image/webp"
                                        className="contact-file-input"
                                    />

                                    <p className="contact-field-help">
                                        Du kan laste opp PDF, JPG, PNG eller WEBP.
                                    </p>
                                </div>

                                <div className="contact-field">
                                    <label htmlFor="vehicleImages">
                                        Bilder av bobilen*
                                    </label>

                                    <input
                                        type="file"
                                        id="vehicleImages"
                                        name="vehicleImages"
                                        onChange={handleImagesChange}
                                        required
                                        multiple
                                        accept="image/jpeg,image/png,image/webp"
                                        className="contact-file-input"
                                    />

                                    <p className="contact-field-help">
                                        Last opp inntil 10 bilder av både
                                        eksteriør og interiør.
                                    </p>

                                    {vehicleImages.length > 0 && (
                                        <p className="contact-files-selected">
                                            {vehicleImages.length}{" "}
                                            bilde
                                            {vehicleImages.length > 1
                                                ? "r"
                                                : ""}{" "}
                                            valgt
                                        </p>
                                    )}
                                </div>
                            </>
                        )}

                        <div className="contact-submit-wrapper">
                            <button
                                type="submit"
                                className="contact-submit-button"
                            >
                                {contactType === "sale"
                                    ? "Send informasjon"
                                    : "Send melding"}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="contact-info-column">
                    <h2>Kontaktinformasjon</h2>

                    <p>
                        <span>Telefon:</span>

                        <a href="tel:+4740828494">
                            <br />
                            +47 408 28 494
                        </a>
                    </p>

                    <p>
                        <span>E-post:</span>

                        <a href="mailto:tommy@3sbc.no">
                            <br />
                            tommy@3sbc.no
                        </a>
                    </p>

                    <p>
                        <span>Forretningsadresse:</span>

                        <span className="contact-address">
                            <br />
                            Siriusveien 29, 1407 Vinterbro
                        </span>
                    </p>

                    <iframe
                        src="https://maps.google.com/maps?q=Siriusveien%2029,%201407%20Vinterbro&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        className="contact-map"
                        loading="lazy"
                        title="3S Bobil & Caravan"
                    />
                </div>
            </section>
        </div>
    );
};

export default ContactPage;