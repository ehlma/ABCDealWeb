import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { Menu } from "lucide-react";

const ClientLayout = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Nav bar for kunder */}
            <nav className="fixed top-0 left-0 z-[50] w-full bg-[#34495e] text-white shadow">
                <div className="flex items-center justfy-between px-8 py-4">
                    <Link to="/">
                        <img src={logo} alt="ABC Deal Logo" className="h-[36px] cursor-pointer" />
                    </Link>

                    {/* Desktop meny */}
                    <ul className="hidden sm:flex flex-grow justify-center gap-6 font-medium">
                        <li><Link to="/" className="text-white hover:text-gray-300 transition-colors">Hjem</Link></li>
                        <li><Link to="/about" className="text-white hover:text-gray-300 transition-colors">Om Oss</Link></li>
                        <li><Link to="/sales-process" className="text-white hover:text-gray-300 transition-colors">Salgsprosessen</Link></li>
                        <li><Link to="/complaints" className="text-white hover:text-gray-300 transition-colors">Reklamasjon</Link></li>
                        <li><Link to="/contact" className="text-white hover:text-gray-300 transition-colors">Kontakt Oss</Link></li>
                    </ul>

                    {/* Hamburder meny */}
                    <button className="sm:hidden bg-transparent border-none p-0 m-0 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X className="w-8 h-8 text-white" /> : <Menu className="w-8 h-8 text-white" />}
                    </button>
                </div>

                {/* Mobilmeny - åpnes under navbar */}
                {menuOpen && (
                    <div className="absolute w-full top-[64px] left-0 bg-[#34495e] text-white px-8 py-4 sm:hidden z-40 shadow-md flex flex-col rounded-b space-y-2">
                        <Link to="/" onClick={() => setMenuOpen(false)} className="flex flex-row text-white hover:text-gray-300 transition-colors">Hjem</Link>
                        <Link to="/about" onClick={() => setMenuOpen(false)} className="flex flex-row text-white hover:text-gray-300 transition-colors">Om Oss</Link>
                        <Link to="/sales-process" onClick={() => setMenuOpen(false)} className="flex flex-row text-white hover:text-gray-300 transition-colors">Salgsprosessen</Link>
                        <Link to="/complaints" onClick={() => setMenuOpen(false)} className="flex flex-row text-white hover:text-gray-300 transition-colors">Reklamasjon</Link>
                        <Link to="/contact" onClick={() => setMenuOpen(false)} className="flex flex-row text-white hover:text-gray-300 transition-colors">Kontakt Oss</Link>
                    </div>
                )}
            </nav>

            {/* Main content */}
            <main className="flex-1 pt-[96px] px-[24px] pb-[24px] overflow-y-auto bg-white">
                <Outlet/>
            </main>

            {/* Footer */}
            <footer className="bg-[#2c3e50] text-white text-center p-4">
                <p>&copy; {new Date().getFullYear()} ABC Deal. Alle rettigheter reservert.</p>
                <p>
                    <Link to="/contact" className="text-white hover:underline">Kontakt oss</Link>
                    <Link to="/admin" className="text-white hover:underline">Admin login</Link></p>
            </footer>
        </div>
    );
};

export default ClientLayout;