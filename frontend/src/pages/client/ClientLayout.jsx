import React, { useState } from "react";
import { Link, Outlet, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { Menu, X } from "lucide-react";
import Footer from "../../components/Footer";

const ClientLayout = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <div  className="flex flex-col flex-1 w-full">
            {/* Nav bar for kunder */}
            <nav className="fixed top-0 left-0 z-[50] w-full bg-navbar-bg/90 shadow-sm backdrop-blur-md p-0 m-0">
                <div className="flex items-center justify-between px-4 custom:px-6 lg:px-8 py-4">
                    <Link to="/">
                        <img src={logo} alt="ABC Deal Logo" className="h-[36px] cursor-pointer" />
                    </Link>

                    {/* Desktop meny */}
                    <ul className="hidden custom:flex flex-grow justify-center gap-6 font-medium">
                        {[
                        { to: "/", label: "Hjem" },
                        { to: "/about", label: "Om Oss" },
                        { to: "/sales-process", label: "Salgsprosessen" },
                        { to: "/contact", label: "Kontakt Oss" },
                        { to: "/complaints", label: "Reklamasjon" }
                        ].map((link) => (
                        <li key={link.to}>
                            <NavLink
                            to={link.to}
                            className={({ isActive }) =>
                                `relative group px-4 py-2 rounded-full overflow-hidden transition duration-300 font-medium`
                            }
                            >
                            <span
                                className={`
                                absolute inset-0 rounded-full z-0 transition-all duration-300
                                ${location.pathname === link.to
                                    ? "bg-[#047464] scale-100 opacity-100"
                                    : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 bg-primary-light"}
                                `}
                            />
                            <span
                                className={`
                                relative z-10 transition-colors duration-300
                                ${location.pathname === link.to ? "text-white" : "text-navbar-link group-hover:text-navbar-link-hover"}
                                `}
                            >
                                {link.label}
                            </span>
                            </NavLink>
                        </li>
                        ))}
                    </ul>

                    {/* Hamburder meny */}
                    <button className="custom:hidden bg-transparent border-none p-0 m-0 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X className="w-8 h-8 text-navbar-icon" /> : <Menu className="w-8 h-8 text-navbar-icon" />}
                    </button>
                </div>

                {/* Mobilmeny - åpnes under navbar */}
                {menuOpen && (
                    <div className="absolute w-full top-[64px] left-0 bg-navbar-bg px-8 py-4 custom:hidden z-40 shadow flex flex-col rounded-b space-y-2">
                        <NavLink 
                            to="/" 
                            onClick={() => setMenuOpen(false)} 
                            className={({ isActive }) =>
                                `flex flex-row text-navbar-link hover:text-navbar-link-hover transition-colors
                                ${isActive ? 'font-bold text-navbar-link-active' : ''}` // Ingen understrek her for å unngå layoutproblemer, men fet og farge
                            }
                        >
                            Hjem
                        </NavLink>

                        <NavLink 
                            to="/about" 
                            onClick={() => setMenuOpen(false)} 
                            className={({ isActive }) =>
                                `flex flex-row text-navbar-link hover:text-navbar-link-hover transition-colors
                                ${isActive ? 'font-bold text-navbar-link-active' : ''}`
                            }
                        >
                            Om Oss
                        </NavLink>

                        <NavLink 
                            to="/sales-process" 
                            onClick={() => setMenuOpen(false)} 
                            className={({ isActive }) =>
                                `flex flex-row text-navbar-link hover:text-navbar-link-hover transition-colors
                                ${isActive ? 'font-bold text-navbar-link-active' : ''}`
                            }
                        >
                            Salgsprosessen
                        </NavLink>

                        <NavLink 
                            to="/contact" 
                            onClick={() => setMenuOpen(false)} 
                            className={({ isActive }) =>
                            `flex flex-row text-navbar-link hover:text-navbar-link-hover transition-colors
                            ${isActive ? 'font-bold text-navbar-link-active' : ''}`
                        }
                        >
                            Kontakt Oss
                        </NavLink>

                        <NavLink 
                            to="/complaints" 
                            onClick={() => setMenuOpen(false)} 
                            className={({ isActive }) =>
                                `flex flex-row text-navbar-link hover:text-navbar-link-hover transition-colors
                                ${isActive ? 'font-bold text-navbar-link-active' : ''}`
                            }
                        >
                            Reklamasjon
                        </NavLink>
                        
                    </div>
                )}
            </nav>

            {/* Main content */}
            <main id="page-content" className="flex-grow pt-0 w-full p-0 m-0">
                {/* <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl"> */}
                    <Outlet />
                {/* </div> */}
            </main>

            <Footer />

        </div>
    );
};

export default ClientLayout;