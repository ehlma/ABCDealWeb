import React, { useEffect, useState } from "react";
import api, { API_ENDPOINTS } from "../../api/api.js";
import AccordionItem from "./AccordionItem";
import { format } from "date-fns";
import { useAuth } from "../contexts/AuthContext";
import ArchivedCasesLink from "./ArchivedCasesLink.jsx";

const AdminDataList = ({
    title,
    fetchEndpoint,
    accordionEndpoint,
    itemFormatter,
    initialStatus = "new",
    isArchivedView = false
}) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");
    const { isAuthenticated, user, loading } = useAuth();

    // Hente data
    const fetchData = async () => {
        if (loading) return; // Vent til auth er lastet
        if (!isAuthenticated || (user && user.role !== "admin")) {
            setError("Du har ikke tilgang til denne siden.");
            return;
        }

        try {
            const res = await api.get(fetchEndpoint);
            setItems(res.data);
        } catch (err) {
            console.error(`Feil ved henting av ${title.toLowerCase()}:`, err);
            setError(`Kunne ikke hente ${title.toLowerCase()}.`);
        }
    };

    // Hent data ved første lasting
    useEffect(() => {
        if (!loading) {
            fetchData();
        }
    }, [fetchEndpoint, loading, isAuthenticated]);

    // Sortering av elementer etter status-prioritet
    const getPriority = (status) => {
        if (status === "new") return 0;
        if (status === "pending") return 1;
        if (status === "resolved") return 2;
        if (status === "archived") return 3;
        return 100; // fallback for ukjent status
    }

    const sortedItems = [...items].sort(
        (a, b) => getPriority(a.status) - getPriority(b.status)
    );

    // Bestemmer tekst og sti for lenken dynamisk
    const baseTitle = title.replace("Innsendte ", "").replace("Arkiverte ", "").toLowerCase();
    const linkToOtherViewText = isArchivedView
        ? `Vis aktive ${baseTitle}`
        : `Vis arkiverte ${baseTitle}`;

    // Logikk for å bestemme PATH
    const currentBaseAdminPath = isArchivedView
        ? (fetchEndpoint === API_ENDPOINTS.adminArchivedContacts ? "/admin/archived/contacts" : "/admin/archived/complaints")
        : (fetchEndpoint === API_ENDPOINTS.adminContacts ? "/admin/contacts" : "/admin/complaints");

        const isContactsPage = currentBaseAdminPath.includes("contacts");

        const linkToOtherViewPath = isArchivedView
            ? (isContactsPage ? "/admin/contacts" : "/admin/complaints")
            : (isContactsPage ? "/admin/archived/contacts" : "/admin/archived/complaints");

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4 text-left text-ui-background">{title}</h2>

            <div className="flex justify-between items-center mb-4">
                <ArchivedCasesLink
                    to={linkToOtherViewPath}
                    text={linkToOtherViewText}
                    className="text-base"
                />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {items.length === 0 && !error && (
                <p className="text-gray-600 text-center">Ingen {title.toLowerCase()} funnet.</p>
            )}

            <div className="grid grid-cols-1 gap-2">
                {sortedItems.map((itemData) => (
                    <AccordionItem
                        key={itemData._id}
                        item={itemFormatter(itemData, initialStatus)}
                        onStatusChange={fetchData} // Callback for oppdatering
                        endpoint={accordionEndpoint} // Endepunkt for patch-kall
                    />
                ))}
            </div>
        </div >
    )
}

export default AdminDataList;