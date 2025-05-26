import { useEffect, useState } from "react";
import api, {API_ENDPOINTS} from "../api";

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
        <div>
            <h2>Innsendte meldinger</h2>
            {error && <p>{error}</p>}
            <ul>
                {contacts.map((msg) => (
                    <li key={msg._id}>
                        <strong>{msg.name}</strong> ({msg.email}, {msg.phoneNum})<br/>
                        {msg.text}<br/>
                        {msg.image && <img src={msg.image} alt="Vedlegg" width="100"/>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminContacts;