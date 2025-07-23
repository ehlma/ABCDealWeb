import React from "react";
import AdminDataList from "../../../components/AdminDataList";
import { API_ENDPOINTS } from "../../../../api/api";
import { format } from "date-fns";

// Funksjon for å formatere arkiverte kontakt-data
const formatArchivedContactItem = (contact) => ({
    _id: contact._id,
    name: contact.name,
    email: contact.email,
    phoneNum: contact.phoneNum,
    text: contact.text,
    date: format(new Date(contact.createdAt), "dd.MM.yy, HH:mm"),
    status: contact.status || "archived",
})

const ArchivedContactsPage = () => {
    return (
        <AdminDataList
            title="Arkiverte meldinger"
            fetchEndpoint={API_ENDPOINTS.adminArchivedContacts}
            accordionEndpoint={API_ENDPOINTS.adminContacts}
            itemFormatter={formatArchivedContactItem}
            showArchivedLink={false}
            archivedLinkPath="admin/arhived/contacts"
            arhivedLinkText="Vis arkiverte meldinger"
            initialStatus="archived"
        />
    )
}

export default ArchivedContactsPage;