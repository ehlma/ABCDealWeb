import React from "react";
import { Link } from "react-router-dom";
import { Facebook } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white px-6 py-12 mt-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 items-center sm:items-start sm:text-left">
                {/* Bedriftsinfo */}
                <div>
                    <h4 className="font-semibold text-lg mb-2">ABC Deal</h4>
                    <p>Org.nr: 999 301 010</p>
                    <p>E-post: kontakt@abcdeal.no</p>
                    <p>Telefon: 47 15 11 11</p>
                </div>
                {/* Navigasjon */}
                <div className="flex flex-col items-center text-left">
                    <h4 className="font-semibold text-lg mb-2">Navigasjon</h4>
                    <ul className="space-y-1">
                        <li><Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">Hjem</Link></li>
                        <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200">Om oss</Link></li>
                        <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">Kontakt</Link></li>
                        <li><Link to="/complaints" className="text-gray-300 hover:text-white transition-colors duration-200">Reklamasjon</Link></li>
                    </ul>
                </div>
                {/* SOSIALE MEDIER */}
                <div>
                    <div className="flex flex-col items-center">
                        <h4 className="font-semibold text-lg mb-2">Følg oss</h4>
                        <a
                            href="https://www.facebook.com/profile.php?id=61565220931869&locale=nb_NO"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition-colors duration-200"
                        >
                            <Facebook className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center text-sm text-gray-400 mt-8">
                © {new Date().getFullYear()} ABC Deal. Alle rettigheter reservert.
            </div>
        </footer>
    )
}

export default Footer;