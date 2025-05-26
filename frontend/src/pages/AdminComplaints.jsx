import { useEffect, useState } from "react";
import api, {API_ENDPOINTS} from "../api";

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
        <div>
            <h2>Innsendte reklamasjoner</h2>
            {error && <p>{error}</p>}
            <ul>
                {complaints.map((c) => (
                    <li key={c._id} style={{marginBottom: "20px"}}>
                        <strong>{c.name}</strong> ({c.email}, {c.phoneNum}) <br />
                        <b>Registreringsnummer: </b> {c.regNum} <br />
                        <b>Beskrivelse: </b> {c.description} <br />
                        {c.visibleDamage && <em>Synlig skade rapportert</em>} <br />
                        {c.image && (
                            <div>
                                <b>Bilde: </b>
                                <img src={c.image} alt="Skade" width="100"/>
                            </div>
                        )}
                        {c.documentation?.length > 0 && (
                            <div>
                                <b>Dokumentasjon: </b>
                                <ul>
                                    {c.documentation.map((doc, idx) => (
                                        <li key={idx}>
                                            <a href="{doc}" target="_blank" rel="noopener noreferrer">
                                                {doc}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminComplaints;