import React from "react";
import AdminDataList from "../../../components/AdminDataList";
import { API_ENDPOINTS } from "../../../../api/api";
import { format } from "date-fns";

// Funksjon for å formatere arkiverte reklamasjon
const formatArchivedComplaintItem = (complaint) => ({
    _id: complaint._id,
    name: complaint.name,
    email: complaint.email,
    phoneNum: complaint.phoneNum,
    regNum: complaint.regNum,
    text: complaint.text,
    date: format(new Date(complaint.createdAt), "dd.MM.yyyy, HH:mm"),
    status: complaint.status || "archived",
    image: complaint.image,
    docs: complaint.documentation || [],
})

const ArchivedComplaintsPage = () => {
    return (
        <AdminDataList
            title="Arkiverte reklamasjoner"
            fetchEndpoint={API_ENDPOINTS.adminArchivedComplaints}
            accordionEndpoint={API_ENDPOINTS.adminComplaints}
            itemFormatter={formatArchivedComplaintItem}
            showArchivedLink={false}
            archivedLinkPath="/admin/archived/complaints"
            archivedLinkText="Vis arkiverte reklamasjoner"
            initialStatus="archived"
        />
    )
}

export default ArchivedComplaintsPage;