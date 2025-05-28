import { useState } from "react";
import { ChevronDown, ChevronUp, Paperclip } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { format } from 'date-fns';

const AccordionItem = ({item}) => {
    const [open, setOpen] = useState(false);

    const statusColor = {
        new: "bg-red-500",
        pending: "bg-yellow-400",
        resolved: "bg-green-500",
    } [item.status] || "bg-gray-400";

    return(
        <Card className="mb-4 shadow-md">
            <div
                className="flex items-center justify-between p4 cursor-pointer hover:bg-gray-50"
                onClick={() => setOpen(!open)}
            >
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <div className={`w-3 h-3 rounded-full ${statusColor}`} title={item.status}></div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.email}</div>
                    <div className="text-sm text-gray-500">{format(new Date(item.createdAt), "dd.MM.yyyy, HH:mm")}</div>
                    {item.regNum && (
                    <div className="text-sm text-gray-500">Bilikon{item.regNum}</div>
                    )}
                </div>
                <div>{open ? <ChevronUp/> : <ChevronDown/>}</div>
            </div>

            {open && (
                <CardContent className="bg-gray-50 px-4 py-2">
                    <div className="text-sm whitespace-pre-line">
                        {item.text && (
                            <p><strong>Melding:</strong> {item.text}</p>
                        )}

                        {item.image && (
                            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                <Paperclip className="h-4 w-4"/>
                                <a
                                    href={item.image}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    Last ned vedlegg
                                </a>
                            </div>
                        )}

                        {item.docs && item.docs.length > 0 && (
                            <div className="mt-2">
                                <strong>Dokumentasjon:</strong>
                                <ul className="list-disc list-inside">
                                    {item.docs.map((doc, i) => (
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
                                    ))}
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