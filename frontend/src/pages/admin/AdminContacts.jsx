import { useEffect, useState } from "react";
import api, {API_ENDPOINTS} from "../../../api/api.js";
import AccordionItem from "../../components/AccordionItem";

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

    return (
        <div className="max-w-2xl mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4">Innsendte meldinger</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {contacts.length === 0 && !error && <p className="text-gray-600 text-center">Ingen meldinger funnet.</p>}

            {contacts.map((msg) => (
                <AccordionItem
                    key={msg._id}
                    item={{
                        _id: msg._id,
                        name: msg.name,
                        email: msg.email,
                        createdAt: msg.createdAt,
                        text: msg.text,
                        // image: msg.image,
                        // hasAttachment: !!msg.image,
                        status: "new",
                    }}
                    endpoint={API_ENDPOINTS.adminContacts}
                />
            ))}
        </div>
    );
};

export default AdminContacts;