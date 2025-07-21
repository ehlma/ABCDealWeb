import { useEffect, useState } from "react";
import api, {API_ENDPOINTS} from "../../../api/api.js";
import AccordionItem from "../../components/AccordionItem";
import {format} from "date-fns";
import AdminDataList from "../../components/AdminDataList.jsx";

// Funksjon for å formatere kontakt-data
    const formatContactItem = (contact) => ({
        _id: contact._id,
        name: contact.name,
        email: contact.email,
        phoneNum: contact.phoneNum,
        date: format(new Date(contact.createdAt), "dd.MM.yyyy, HH:mm"),
        text: contact.text,
        // image: contact.image, // Hvis du vil inkludere bilde
        // hasAttachment: !!contact.image, // Hvis du vil sjekke for vedlegg
        status: contact.status || "new",
    });

const AdminContacts = () => {
    return (
        <AdminDataList
            title="Innsendte meldinger"
            fetchEndpoint={API_ENDPOINTS.adminContacts}
            accordionEndpoint={API_ENDPOINTS.adminContacts}
            itemFormatter={formatContactItem}
        />
    );
};

export default AdminContacts;