import { useEffect, useState } from "react";
import api, {API_ENDPOINTS} from "../../../api/api.js";
import AccordionItem from "../../components/AccordionItem";
import {format} from "date-fns";

const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState([]);

    // Funksjon for å hente oppdaterte kontakter
    const fetchContacts = async () => {
        try {
            // Bruker API_ENDPOINTS.adminContacts for å hente kontakter for admin
            const res = await api.get(API_ENDPOINTS.adminContacts);
            setContacts(res.data);
        } catch (err) {
            console.error("Feil ved henting av kontaktskjemaer: ", err);
            setError("Kunne ikke hente kontaktskjemaer.");
        }
    };

    // Hent kontakter ved første lasting av komponenten
    useEffect(() => {
        fetchContacts();
    }, [])

    // Sortering av reklamasjoner etter status-prioritet
    const getPriority = (status) => {
        if (status === "new") return 0;
        if (status === "pending") return 1;
        if (status === "resolved") return 2;
    };

    const sortedContacts = [...contacts].sort(
        (a, b) => getPriority(a.status) - getPriority(b.status)
    );

    return (
        <div className="max-w-2xl mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4">Innsendte meldinger</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {contacts.length === 0 && !error && <p className="text-gray-600 text-center">Ingen meldinger funnet.</p>}

            {sortedContacts.map((msg) => (
                <AccordionItem
                    key={msg._id}
                    item={{
                        _id: msg._id,
                        name: msg.name,
                        email: msg.email,
                        date: format(new Date(msg.createdAt), "dd.MM.yyyy, HH:mm"),
                        text: msg.text,
                        // image: msg.image,
                        // hasAttachment: !!msg.image,
                        status: msg.status || "new",
                    }}
                    onStatusChange={fetchContacts}
                    endpoint={API_ENDPOINTS.adminContacts}
                />
            ))}
        </div>
    );
};

export default AdminContacts;