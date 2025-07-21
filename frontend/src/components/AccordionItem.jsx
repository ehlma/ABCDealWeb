import { useState } from "react";
import { ChevronDown, ChevronUp, Paperclip, User, Mail, Phone } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { format } from 'date-fns';
import api, { API_ENDPOINTS } from "../../api/api";

// Hjelpefunksjon for å sjekke om URL peker til et bilde
const isImageUrl = (url) => {
    return /\.(jpeg|jpg|png|gif|webp)$/i.test(url); // regex
}

const AccordionItem = ({ item, onStatusChange, endpoint }) => {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(item.status || "new");
    const [message, setMessage] = useState(null);

    const statusClasses = {
        new: "bg-red-50 border border-red-100",
        pending: "bg-yellow-50 border border-yellow-100",
        resolved: "bg-green-50 border border-green-100",
    }[status] || "bg-gray-50 border border-gray-100";

    // const statusBorderColor = `border-2 border-${statusColor}`;

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
        <Card className={`mb-4 ${statusClasses} rounded-lg shadow-sm transition-all duration-300`}>
            <div
                className="flex justify-between items-center px-4 py-3 cursor-pointer  text-left"
                onClick={() => setOpen(!open)}
            >
                <div className="flex flex-wrap gap-x-4 gap-y-1 items-center text-sm">
                    {/* <div className={`w-2 h-2 rounded-full ${statusColor}`} title={item.status}></div> */}
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
                // className={`grid transition-all duration-300 overflow-hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                //     }`}
                className={`transition-max-height duration-500 overflow-hidden`}
                style={{maxHeight: open ? "1000px" : "0px"}}
            >
                <CardContent className="p-6 space-y-4 bg-gray-50 text-left rounded-b-lg">

                    {/* Header info for expand view */}
                    <div className="mb-4 pb-4 border-b border-gray-200">
                        <div className="text-lg font-bold text-gray-800 mb-2">{item.name}</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-6 text-sm text-gray-600">
                            <p className="flex items-center gap-1"><Mail size={16} />{item.email}</p>
                            {item.phoneNum && <p className="flex items-center gap-2">{item.phoneNum}</p>}
                            {item.regNum && <p className="flex items-center gap-2">🚗{item.regNum}</p>}
                            <p className="flex items-center gap-2">🗓️ {formattedDate}</p>
                        </div>
                    </div>

                    {/* Seksjon: Problembeskrivelse */}
                    {item.text && (
                        <div className="mb-4 pb-4 border-b border-gray-200">
                            <h4 className="text-base font-semibold text-gray-800 mb-2">Melding fra kunde</h4>
                            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{item.text}</p>
                        </div>
                    )}

                    {/* Seksjon: Bilde av skade */}
                    {item.image && (
                        <div className="mb-4 pb-4 border-b border-gray-200">
                            <h4 className="text-base font-semibold text-gray-800 mb-2">Bilde av skaden</h4>
                            <a href={item.image} target="_blank" rel="noopener noreferrer" className="block w-32 h-32 overflow-hidden rounded-md border border-gray-300 shadow-sm">
                                <img src={item.image} alt="Bilde av skaden" className="w-full h-full object-cover" />
                            </a>
                        </div>
                    )}

                    {/* Seksjon: Dokumentasjon */}
                    {item.docs && item.docs.length > 0 ? (
                        <div className="">
                            <h4 className="text-base font-semibold text-gray-800">Dokumentasjon</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:gris-cols-4 gap-4">
                                {item.docs.map((doc, i) => (
                                    <div key={i} className="flex flex-col items-center text-center p-2 bg-white rounded-md shadow-sm border border-gray-100">
                                        {doc && (
                                            <a
                                                href={doc}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex flex-col items-center text-blue-600 hover:underline"
                                            >
                                                {isImageUrl(doc) ? (
                                                    <img src={doc} alt="Dokument" className="w-16 h-16 object-cover rounded-md mb-1 border border-gray-200" />
                                                ) : (
                                                    <Paperclip size={32} className="text-gray-500 mb-1" />
                                                )}
                                                <span className="text-xs font-medium text-gray-700 break-all">{doc.split('/').pop()}</span>
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        !item.image && <p className="text-sm text-gray-500 italic">Ingen vedlegg sendt inn.</p>
                    )}
                </CardContent>
            </div>
        </Card>
    );
};

export default AccordionItem;