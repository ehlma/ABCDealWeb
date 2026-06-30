import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, CircleUser, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const AdminLayout = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();  // Kall logout-funksjon fra context
        setMenuOpen(false); // Lukk menyen etter utlogging
        navigate('/'); // Omdiriger til innloggingsside etter utlogging
    }

    // Navigasjonslenker i admin
    const links = [
        { to: "/admin", label: "Dashboard", end: true },
        { to: "/admin/settings", label: "Ansatte" },
        { to: "/admin/articles", label: "Artikler" },

        {/** TIL FREMTIDIG POTENSIELL OPPGRADERING
    
        { to: "/admin/contacts", label: "Kontaktskjema" },
        { to: "/admin/complaints", label: "Reklamasjon" },
        */}
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/** Header */}
            <nav className="fixed top-0 left-0 z-[50] w-full bg-admin-bg text-admin-text shadow">
                <div className="flex items-center justify-between px-6 py-4">
                    {/** Logo */}
                    <NavLink to="/admin" aria-label="Gå til admin-dashboard">
                        <img src="/3s-logo.png" alt="3S logo" className="h-14 w-auto rounded-lg bg-white p-1.5 shadow-sm" />
                    </NavLink>

                    {/** Desktop meny med animasjon */}
                    <ul className="hidden sm:flex gap-6 font-medium flex-grow justify-center">
                        {links.map(({ to, label, end }) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    end={end}
                                    className={({ isActive }) =>
                                        `relative group px-4 py-2 rounded-full overflow-hidden transition duration-300 font-medium`
                                    }
                                >
                                    {/** Bakgrunnsanimasjon */}
                                    <span
                                        className={`
                                            absolute inset-0 rounded-full z-0 transition-all duration-300
                                            ${location.pathname === to
                                                ? "bg-admin-active scale-100 opacity-100"
                                                : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 bg-white/10"}
                                        `}
                                    />
                                    {/** Lenketekst */}
                                    <span className="relative z-10 text-white group-hover:text-admin-text transition-colors duration-300">
                                        {label}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/** Logg ut ikon  */}
                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            // Bruker innlogget
                            <button
                                onClick={handleLogout}
                                className="hidden sm:flex flex-col items-center gap-1 text-white hover:text-admin-text hover:drop-shadow-lg transition-all duration-200 bg-transparent border-none cursor-pointer p-0"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logg ut</span>
                                <span>{user.firstName || "Pålogget"}</span>
                            </button>
                        ) : (
                            // Bruker ikke innlogget
                            <NavLink to="/" className="hidden sm:flex flex-col items-center gap-1 text-white hover:text-admin-text hover:drop-shadow-lg transition-all duration-200">
                                <CircleUser className="w-5 h-5" />
                                <span>Logg inn</span>
                            </NavLink>
                        )}

                        {/** Hamburgermeny for mobil */}
                        <button className="sm:hidden bg-transparent border-none p-0 m-0 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <X className="w-8 h-8 text-white" /> : <Menu className="w-8 h-8 text-white" />}
                        </button>
                    </div>
                </div>

                {/** Åpen hamburgermeny*/}
                {menuOpen && (
                    <div className="absolute w-full top-[72px] left-0 bg-admin-bg text-white px-6 py-4 sm:hidden z-40 shadow-md flex flex-col rounded-b space-y-2">
                        {links.map(({ to, label, end }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={end}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex flex-row rounded-lg px-3 py-2 text-white hover:bg-white/10 hover:text-admin-text transition-colors duration-200 ${isActive ? 'bg-admin-active font-bold' : ''}`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                        <hr className="border-t border-white/20 my-2" />
                        {/** Logg ut eller inn for mobil */}
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="flex flex-col items-center gap-2 text-white hover:text-admin-text hover:drop-shadow-lg transition-all duration-200 bg-transparent border-none cursor-pointer p-0"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logg ut</span>
                                <span>{user.firstName || "Pålogget"}</span>
                            </button>
                        ) : (
                            <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex flex-col items-center gap-2 text-white hover:text-admin-text hover:drop-shadow-lg transition-all duration-200">
                                <CircleUser className="w-5 h-5" />
                                <span>Logg inn</span>
                            </NavLink>
                        )}
                    </div>
                )}
            </nav>

            <div className="pointer-events-none fixed top-[60px] left-0 w-full h-20 z-10 bg-gradient-to-b from-white/90 to-transparent"></div>

            {/** Sideinnhold  */}
            <main className="flex-1 pt-[96px] px-[24px] pb-[24px] overflow-y-auto bg-bg-color">
                <Outlet context={{ user }} />
            </main>
        </div>
    );
};

export default AdminLayout;
