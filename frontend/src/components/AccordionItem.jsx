import { useState } from "react";
import { ChevronDown, ChevronUp, Paperclip, User, Mail, Phone, Archive, Car, CalendarDays, Copy } from 'lucide-react';
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
    const [showStatusToast, setShowStatusToast] = useState(false);

    const statusClasses = {
        new: "bg-ui-background  text-gray-800",
        pending: "bg-[#6D8DAE] text-gray-800",
        resolved: "bg-gray-200 text-gray-400 border-gray-300",
    }[status] || "bg-gray-50 ";


    // const statusBorderColor = `border-2 border-${statusColor}`;

    // fallback hvis item.date ikke er ferdig formatert
    const formattedDate = item.date
        ? item.date
        : format(new Date(item.createdAt), "dd.MM.yyyy, HH:mm");

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setMessage(null);
        const originalStatus = status;

        try {
            await api.patch(`${endpoint}/${item._id}`, { status: newStatus });

            setStatus(newStatus);
            setMessage({ text: "Status oppdatert", type: "success" });
            setShowStatusToast(true);
            if (onStatusChange) onStatusChange();
            setTimeout(() => {
                setShowStatusToast(false);
                setMessage(null)
            }, 2000);
        } catch (error) {
            console.error("Feil ved oppdatering av status: ", error);
            setMessage({ text: "Kunne ikke oppdatere status. Prøv igjen senere.", type: "error" });
            setShowStatusToast(true);
            setStatus(originalStatus);
            setTimeout(() => {
                setShowStatusToast(false);
                setMessage(null)
            }, 2000);
        }
    };

    const handleArchive = async (e) => {
        e.stopPropagation();
        if (!window.confirm("Er du sikker på at du vil arkivere denne saken?")) {
            return;
        }

        try {
            await api.patch(`${endpoint}/${item._id}`, { isArchived: true });
            setMessage({ text: "Saken er arkivert", type: "success" });
            setShowStatusToast(true);
            if (onStatusChange) onStatusChange();
            setTimeout(() => {
                setShowStatusToast(false);
                setMessage(null)
            }, 2000);
        } catch (error) {
            console.error("Feil ved arkivering av saken: ", error);
            setMessage({ text: "Kunne ikke arkivere saken. Prøv igjen senere.", type: "error" });
            setShowStatusToast(true);
            setTimeout(() => {
                setShowStatusToast(false);
                setMessage(null)
            }, 2000);
        }
    }

    const handleCopyEmail = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(item.email);
        setMessage({text: "E-post kopiert", type: "success"});
        setShowStatusToast(true);
        setTimeout(() => {
            setShowStatusToast(false);
            setMessage(null)
        }, 2000);
    }

    return (
        <>
            <Card className={`mb-4 ${statusClasses} rounded-lg shadow-sm transition-all duration-300`}>
                <div
                    className="flex justify-between items-center px-4 py-0 cursor-pointer  text-left"
                    onClick={() => setOpen(!open)}
                >
                    <div className="flex flex-col pt-4">
                        {/* <div className={`w-2 h-2 rounded-full ${statusColor}`} title={item.status}></div> */}
                        <span
                            className={`font-semibold text-base leading-none ${
                                status === "new" || status === "pending"
                                ? "text-warm-off-white"
                                : "text-gray-800"
                            }`}
                            >
                            {item.name}
                        </span>
                        <span
                            className={`text-sm mt-2 ${
                                status === "resolved"
                                ? "text-gray-500"
                                : "text-warm-off-white"
                            }`}
                            >
                            {formattedDate}
                            </span>                    
                    </div>

                    <div className="flex items-center gap-2">
                        <select
                            value={status}
                            onChange={(e) => {
                                e.stopPropagation();
                                handleStatusChange(e);
                            }}
                            onClick={(e) => { e.stopPropagation(); }}
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

                <div
                    // className={`grid transition-all duration-300 overflow-hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    //     }`}
                    className={`transition-max-height duration-500 overflow-hidden`}
                    style={{ maxHeight: open ? "1000px" : "0px" }}
                >
                    <CardContent className="pb-6 space-y-4 bg-gray-50 text-left rounded-b-lg">

                        <button
                            onClick={handleArchive}
                            className="text-gray-500 hover:text-gray-700 py-1 px2 rounded-md transition-colors"
                            title="Arkiver sak"
                        >
                            <Archive size={20}/>
                        </button>

                        {/* Header info for expand view */}
                        <div className="mb-4 pb-4 border-b border-gray-200">
                            <div className="text-lg font-bold text-gray-800 mb-2">{item.name}</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-6 text-sm text-gray-600">
                                {/* <p className="flex items-center gap-1"><Mail size={16} />{item.email}</p> */}
                                <div className="flex items-center gap-1 group">
                                    <Mail size={16}/>
                                    <span>{item.email}</span>
                                    <button
                                        onClick={handleCopyEmail}
                                        title="Kopier e-post"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity ml1"
                                    >
                                        <Copy size={14} className="text-gray-500 hover:text-gray-700"/>
                                    </button>

                                </div>
                                {item.phoneNum && <p className="flex items-center gap-2"><Phone size={16} />{item.phoneNum}</p>}
                                <p className="flex items-center gap-2"><CalendarDays size={16} />{formattedDate}</p>
                                {item.regNum && <p className="flex items-center gap-2"><Car size={16} />{item.regNum}</p>}

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
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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

            {
                showStatusToast && message && (
                    <div
                        className={`fixed bottom-4 left-1/2 -translate-x-1/2 p-4 rounded-lg text-white z-50 transition-transform duration-300 transform ${showStatusToast ? "translate-y-0" : "translate-y-full"}
                            ${message.type === "success" ? "bg-gray-700" : "bg-red-500"}`}
                        role="alert"
                    >
                        <p className="text-sm font-semibold">{message.text}</p>
                    </div>
                )
            }
        </>

    );
};

export default AccordionItem;