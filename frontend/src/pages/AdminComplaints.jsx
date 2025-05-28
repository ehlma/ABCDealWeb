import { useEffect, useState } from "react";
import api, {API_ENDPOINTS} from "../api";
import AccordionItem from "../components/AccordionItem";
import { format } from "date-fns";


const AdminComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await api.get(API_ENDPOINTS.complaints);
                setComplaints(res.data);
            } catch (err) {
                setError("Kunne ikke hente reklamasjon. ")
            }
        };
        fetchComplaints();
    }, []);

    return (
        <div className="max-w-2x1 mx-auto mt-6">
            <h2 className="text-2x1 font-bold mb-4">Innsendte reklamasjoner</h2>
            {error && <p className="text-red-500">{error}</p>}
            {complaints.map((c) => (
                <AccordionItem
                    key={c._id}
                    item={{
                        name: c.name,
                        email: c.email,
                        date: format(new Date(c.createdAt), "dd.MM.yyyy, HH:mm"),
                        text: c.description,
                        regNum: c.regNum,
                        image: c.image,
                        hasAttachment: !!c.image,
                        docs: c.documentation || [],
                        status: "new",
                    }}
                />
            ))}
        </div>
    );
};

export default AdminComplaints;