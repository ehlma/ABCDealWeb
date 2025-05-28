import { useEffect, useState } from "react";
import api, {API_ENDPOINTS} from "../api";
import AccordionItem from "../components/AccordionItem";

const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState([]);

    // sett inn JWT (token)
    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_URL;


    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await api.get(API_ENDPOINTS.contacts);
                setContacts(res.data);
            } catch (error) {
                setError("Could not fetch contact forms");
            }
        };

        fetchContacts();
    }, [])

    return (
        <div className="max-w-2x1 mx-auto mt-6">
            <h2 className="text-2x1 font-bild mb-4">Innsendte meldinger</h2>
            {error && <p className="text-red-500">{error}</p>}
            {contacts.map((msg) => (
                <AccordionItem
                    key={msg._id}
                    item={{
                        name: msg.name,
                        email: msg.email,
                        createdAt: msg.createdAt,
                        text: msg.text,
                        image: msg.image,
                        hasAttachment: !!msg.image,
                        status: "new",
                    }}
                />
            ))}
        </div>
    );
};

export default AdminContacts;