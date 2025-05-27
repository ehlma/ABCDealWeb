import { useState } from "react";
import { ChevronDown, ChevronUp, Paperclip } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AccordionItem = ({item}) => {
    const [open, setOpen] = useState(false);

    const statusColor = {
        new: "bg-red-500",
        pending: "bg-yellow-400",
        resolved: "bg-green-500",
    } [item.status] || "bg-gray-400";

    return(
        <Card classname="mb-4 shadow-md">
            <div
                className="flex items-center justify-between p4 cursor-pointer hover:bg-gray-50"
                onClick={() => setOpen(!open)}
            >
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <div className={`w-3 h-3 rounded-full ${statusColor}`} title={item.status}></div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.email}</div>
                    <div className="text-sm text-gray-500">{item.date}</div>
                    {item.regNum && <div className="text-sm text-gray-500">Biliko{item.regNum}</div>}
                    {item.hasAttachment && (
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Paperclip size={16}/> Vedlegg
                        </div>
                    )}
                </div>
                <div>{open ? <ChevronUp/> : <ChevronDown/>}</div>
            </div>

            {open && (
                <CardContent className="bg-gray-50 px-4 py-2">
                    <div className="text-sm whitespace-pre-line">
                        <p><strong>Melding:</strong> {item.message}</p>

                        {item.image && (
                            <img
                                src={item.image}
                                alt=""Vedlegg
                                className="mt-2 max-w-xs rounded border"
                            />
                        )}

                        {item.docs && item.docs.length > 0 && (
                            <div className="mt-2">
                                <strong>Dokumentasjon:</strong>
                                <ul className="list-disc list-inside">
                                    {item.docs.map((doc, i) => {
                                        <li key={i}>
                                            <a
                                                href={doc}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                {doc.split('/').pop()}
                                            </a>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                </CardContent>
            )}
        </Card>
    );
};

export default AccordionItem;