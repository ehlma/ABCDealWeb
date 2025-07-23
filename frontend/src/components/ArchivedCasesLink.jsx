import React from "react";
import { Link } from "react-router-dom";
import { FolderArchive } from "lucide-react";

const ArchivedCasesLink = ({to, text, className}) => {
    return (
        <Link
            to={to}
            className={`flex items-center gap-2 px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors ${className || ""}`}
        >
            <FolderArchive size={18}/>
            <span>{text}</span>
        </Link>
    )
} 

export default ArchivedCasesLink;