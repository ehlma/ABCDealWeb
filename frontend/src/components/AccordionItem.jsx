import { useState } from "react";
import { ChevronDown, ChevronUp, Paperclip } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { format } from 'date-fns';
import api, { API_ENDPOINTS } from "../../api/api";

const AccordionItem = ({ item, onStatusChange, endpoint }) => {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(item.status || "new");
    const [message, setMessage] = useState(null);

    const statusColor = {
        new: "bg-red-500",
        pending: "bg-yellow-400",
        resolved: "bg-green-500",
    }[status] || "bg-gray-400";

    // fallback hvis item.date ikke er ferdig formatert
    const formattedDate = item.date
        ? item.date
        : format(new Date(item.createdAt), "dd.MM.yyyy, HH:mm");

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        setMessage(null);

        try {
            await api.patch(`${endpoint}/${item._id}`, { status: newStatus });

            setMessage({ text: "Status oppdatert.", type: "success" });
            if (onStatusChange) onStatusChange();
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error("Feil ved oppdatering av status: ", error);
            setMessage({ text: "Kunne ikke oppdatere status. Prøv igjen senere.", type: "error" });
        }
    };

    return (
        <Card className="mb-4 shadow-md transition-all duration-300">
            <div
                className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-50"
                onClick={() => setOpen(!open)}
            >
                <div className="flex flex-wrap gap-x-4 gap-y-1 items-center text-sm">
                    <div className={`w-2 h-2 rounded-full ${statusColor}`} title={item.status}></div>
                    <span className="font-medium">{item.name}</span>
                    <div className="text-sm text-gray-500">🗓️{formattedDate}</div>
                </div>

                <div className="flex items-center gap-2">
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                    >
                        <option value="new">Ny</option>
                        <option value="pending">Påbegynt</option>
                        <option value="resolved">Ferdig</option>
                    </select>
                    <div onClick={() => setOpen(!open)} className="cursor-pointer">
                        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                </div>
            </div>

            {message && (
                <div className={`p-2 text-center text-sm font-semibold ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {message.text}
                </div>
            )}

            <div
                className={`grid transition-all duration-300 overflow-hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
            >
                <CardContent className="overflow-hidden px-6 py-4 space-y-3 bg-gray-50">
                    <div className="text-sm whitespace-pre-line leading-relaxed">
                        <div className="text-sm text-gray-600">📧 {item.email}</div>
                        {item.regNum && (
                            <div className="text-gray-500">🚗 Reg.nr: {item.regNum}</div>
                        )}
                        {item.text && (
                            <p>
                                <strong>Melding:</strong> {item.text}
                            </p>
                        )}

                        {item.image && (
                            <div className="flex items-center gap-2 text-blue-600">
                                <a
                                    href={item.image}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    📎 Last ned vedlegg
                                </a>
                            </div>
                        )}

                        {item.docs && item.docs.length > 0 && (
                            <div className="mt-2">
                                <strong>Dokumentasjon:</strong>
                                <ul className="list-disc list-inside ml-4">
                                    {item.docs.map((doc, i) => (
                                        <li key={i}>
                                            {doc && (
                                                <a
                                                    href={doc}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 underline"
                                                >
                                                    {doc.split('/').pop()}
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </CardContent>
            </div>
        </Card>
    );
};

export default AccordionItem;