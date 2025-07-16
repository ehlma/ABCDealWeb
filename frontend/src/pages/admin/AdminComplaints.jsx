import { useEffect, useState } from "react";
import api, {API_ENDPOINTS} from "../../../api/api.js";
import AccordionItem from "../../components/AccordionItem";
import { format } from "date-fns";


const AdminComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [error, setError] = useState("");

    // 1. funksjon for å hente oppdaterte reklamasjoner
    const fetchComplaints = async () => {
        try {
            const res = await api.get(API_ENDPOINTS.adminComplaints);
            setComplaints(res.data);
        } catch (err) {
            setError("Kunne ikke hente reklamasjon. ")
        }
    };

    // 2. hent reklamasjoner ved første lasting
    useEffect(() => {
        fetchComplaints();
    }, []);

    // 3. sortering av reklamasjoner etter status-prioritet
    const getPriority = (status) => {
        if (status === "new") return 0;
        if (status === "pending") return 1;
        if (status === "resolved") return 2;
    };

    const sortedComplaints = [...complaints].sort(
        (a, b) => getPriority(a.status) - getPriority(b.status)
    );

    return (
        <div className="max-w-2xl mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4">Innsendte reklamasjoner</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {complaints.length === 0 && !error && <p className="text-gray-600 text-center">Ingen meldinger funnet</p>}
            {sortedComplaints.map((c) => (
                <AccordionItem
                    key={c._id}
                    item={{
                        _id: c._id,
                        name: c.name,
                        email: c.email,
                        date: format(new Date(c.createdAt), "dd.MM.yyyy, HH:mm"),
                        text: c.description,
                        regNum: c.regNum,
                        image: c.image,
                        hasAttachment: !!c.image,
                        docs: c.documentation || [],
                        status: c.status || "new"
                    }}
                    onStatusChange={fetchComplaints} // 4. send prop
                    endpoint={API_ENDPOINTS.adminComplaints} // 5. sender med endepunkt for patch-kall
                />
            ))}
        </div>
    );
};

export default AdminComplaints;