import React, { useState } from "react";
import { Link, Outlet, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { Menu, X } from "lucide-react";
import Footer from "../../components/Footer";

const ClientLayout = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="flex flex-col flex-1 w-full">
            {/* Nav bar for kunder */}
            <nav className="fixed top-0 left-0 z-[50] w-full bg-navbar-bg shadow p-0 m-0">
                <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
                    <Link to="/">
                        <img src={logo} alt="ABC Deal Logo" className="h-[36px] cursor-pointer" />
                    </Link>

                    {/* Desktop meny */}
                    <ul className="hidden sm:flex flex-grow justify-center gap-6 font-medium">
                        <li>
                            <NavLink 
                                to="/"
                                className={({isActive}) => 
                                `text-navbar-link hover:text-navbar-link-hover transition-colors
                                ${isActive ? `font-bold border-b-2 border-navbar-link-active`: ""}`
                                }
                            >
                                Hjem
                            </NavLink>
                        
                        </li>

                        <li>
                            <NavLink 
                                to="/about"
                                className={({ isActive }) =>
                                    `text-navbar-link hover:text-navbar-link-hover transition-colors
                                    ${isActive ? 'font-bold border-b-2 border-navbar-link-active' : ''}`
                                }
                            >
                                Om Oss
                            </NavLink>
                        
                        </li>

                        <li>
                            <NavLink 
                                to="/sales-process"
                                className={({ isActive }) =>
                                    `text-navbar-link hover:text-navbar-link-hover transition-colors
                                    ${isActive ? 'font-bold border-b-2 border-navbar-link-active' : ''}`
                                }
                            >
                                Salgsprosessen
                            </NavLink>
                        </li>

                        <li>
                            <NavLink 
                                to="/complaints"
                                className={({ isActive }) =>
                                    `text-navbar-link hover:text-navbar-link-hover transition-colors
                                    ${isActive ? 'font-bold border-b-2 border-navbar-link-active' : ''}`
                                }
                            >
                                Reklamasjon
                        </NavLink>
                        </li>

                        <li>
                            <NavLink 
                                to="/contact"
                                className={({ isActive }) =>
                                    `text-navbar-link hover:text-navbar-link-hover transition-colors
                                    ${isActive ? 'font-bold border-b-2 border-navbar-link-active' : ''}`
                                }
                            >
                                Kontakt Oss
                        </NavLink>
                        </li>

                    </ul>

                    {/* Hamburder meny */}
                    <button className="sm:hidden bg-transparent border-none p-0 m-0 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X className="w-8 h-8 text-navbar-icon" /> : <Menu className="w-8 h-8 text-navbar-icon" />}
                    </button>
                </div>

                {/* Mobilmeny - åpnes under navbar */}
                {menuOpen && (
                    <div className="absolute w-full top-[64px] left-0 bg-navbar-bg px-8 py-4 sm:hidden z-40 shadow flex flex-col rounded-b space-y-2">
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
                            to="/complaints" 
                            onClick={() => setMenuOpen(false)} 
                            className={({ isActive }) =>
                                `flex flex-row text-navbar-link hover:text-navbar-link-hover transition-colors
                                ${isActive ? 'font-bold text-navbar-link-active' : ''}`
                            }
                        >
                            Reklamasjon
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
                    </div>
                )}
            </nav>
            <div className="pointer-events-none w-full fixed top-[60px] left-0 w-full h-20 z-10 bg-gradient-to-b from-white/90 to-transparent"></div>


            {/* Main content */}
            <main className="flex-grow pt-[96px] bg-white w-full px-4 sm:px-6 lg:px-8">
                {/* <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl"> */}
                    <Outlet />
                {/* </div> */}
            </main>

            <Footer />

        </div>
    );
};

export default ClientLayout;