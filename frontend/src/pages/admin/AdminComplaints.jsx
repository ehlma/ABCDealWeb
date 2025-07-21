import { useEffect, useState } from "react";
import api, {API_ENDPOINTS} from "../../../api/api.js";
import AccordionItem from "../../components/AccordionItem";
import { format } from "date-fns";
import AdminDataList from "../../components/AdminDataList.jsx";

// Funksjon for å formatere reklamasjons-data
const formatComplaintItem = (complaint) => ({
    _id: complaint._id,
    name: complaint.name,
    email: complaint.email,
    phoneNum: complaint.phoneNum,
    regNum: complaint.regNum,
    description: complaint.description,
    date: format(new Date(complaint.createdAt), "dd.MM.yyyy, HH:mm"),
    status: complaint.status || "new",
    image: complaint.image,
    docs: complaint.documentation || [],

})


const AdminComplaints = () => {
    return (
        <AdminDataList
            title="Innsendte reklamasjoner"
            fetchEndpoint={API_ENDPOINTS.adminComplaints}
            accordionEndpoint={API_ENDPOINTS.adminComplaints}
            itemFormatter={formatComplaintItem}
        />
    );
};

export default AdminComplaints;