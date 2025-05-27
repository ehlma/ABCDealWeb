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
        <Card>
            
        </Card>
    )
}