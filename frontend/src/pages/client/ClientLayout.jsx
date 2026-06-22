import { useState, useEffect } from "react";
import { Link, Outlet, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "/3s-logo.png";
import Footer from "../../components/Footer";
import "./ClientLayout.css";

const navLinks = [
    { to: "/", label: "Hjem" },
    { to: "/about", label: "Om Oss" },
    { to: "/sales-process", label: "Salgs- og kjøpsprosessen" },
    { to: "/for-sale", label: "Til Salgs" },
    { to: "/contact", label: "Kontakt Oss" },
    { to: "/complaints", label: "Reklamasjon" },
];

const ClientLayout = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="client-layout">
            <nav className="navbar">
                <div className="navbar__container">
                    <Link to="/" onClick={() => setMenuOpen(false)}>
                        <img
                            src={logo}
                            alt="3S Bobil & Caravan logo"
                            className="navbar__logo"
                        />
                    </Link>

                    <ul className="navbar__menu">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.to;

                            return (
                                <li key={link.to}>
                                    <NavLink to={link.to} className="navbar__link">
                                        <span
                                            className={`navbar__link-bg ${isActive ? "navbar__link-bg--active" : ""
                                                }`}
                                        />

                                        <span
                                            className={`navbar__link-text ${isActive ? "navbar__link-text--active" : ""
                                                }`}
                                        >
                                            {link.label}
                                        </span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>

                    <button
                        type="button"
                        className="navbar__mobile-toggle"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {menuOpen && (
                    <div className="navbar__mobile-menu">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    `navbar__mobile-link ${isActive ? "navbar__mobile-link--active" : ""
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                )}
            </nav>

            <main id="page-content" className="client-layout__main">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default ClientLayout;