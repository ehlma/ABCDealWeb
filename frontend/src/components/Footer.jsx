import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-200 text-gray-800 text-center p-4 w-full mt-12">
            <p>&copy; {new Date().getFullYear()} ABC Deal. Alle rettigheter reservert.</p>
            <p><Link to="/contact" className="text-gray-800 hover:underline">Kontakt oss</Link></p>
            <p><Link to="/login" className="text-gray-800 hover:underline">Admin login</Link></p>
        </footer>
    )
}

export default Footer;