import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, CircleUser, LogOut, ChevronDown, ExternalLink } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const AdminLayout = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();  // Kall logout-funksjon fra context
        setMenuOpen(false); // Lukk menyen etter utlogging
        setUserMenuOpen(false)
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
                                                : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 bg-admin-hover"}
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
                            <div className="relative hidden sm:block">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-admin-text hover:bg-admin-active transition-all duration-200"
                                >
                                    <CircleUser className="w-5 h-5" />
                                    <div className="text-left leading-tight">
                                        <p className="text-sm font-medium">{user.firstName || "Pålogget"}</p>
                                        <p className="text-xs text-admin-text/70">Administrator</p>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                                </button>
                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-3 w-56 rounded-xl bg-white text-slate-800 shadow-lg border border-admin-border overflow-hidden">
                                        <div className="px-4 py-3 border-b border-slate-200">
                                            <p className="font-medium">{user.firstName || "Pålogget"}</p>
                                            <p className="text-sm text-slate-500">Administrator</p>
                                        </div>
                                        <a
                                            href="/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-slate-100 transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Se nettside
                                        </a>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-left hover:bg-slate-100 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logg ut
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Bruker ikke innlogget
                            <NavLink to="/" className="hidden sm:flex flex-col items-center gap-1 text-white hover:text-admin-text hover:drop-shadow-lg transition-all duration-200">
                                <CircleUser className="w-5 h-5" />
                                <span>Logg inn</span>
                            </NavLink>
                        )}

                        {/** Hamburgermeny for mobil */}
                        <button className="sm:hidden rounded-lg bg-admin-hover p-2 text-admin-text hover:bg-admin-active transition-colors duration-200 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <X className="w-7 h-7 text-admin-text" /> : <Menu className="w-7 h-7 text-admin-text" />}
                        </button>
                    </div>
                </div>

                {/** Åpen hamburgermeny*/}
                {menuOpen && (
                    <div className="absolute w-full top-full left-0 bg-admin-bg text-admin-text px-6 py-4 sm:hidden z-40 shadow-md flex flex-col rounded-b space-y-2">
                        {links.map(({ to, label, end }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={end}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex flex-row rounded-lg px-3 py-2 text-admin-text hover:bg-admin-hover transition-colors duration-200 ${isActive ? 'bg-admin-active font-bold' : ''}`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                        <hr className="border-t border-admin-border/30 my-2" />
                        {/** Logg ut eller inn for mobil */}
                        {isAuthenticated ? (
                            // <button
                            //     onClick={handleLogout}
                            //     className="flex flex-col items-center gap-2 text-white hover:text-admin-text hover:drop-shadow-lg transition-all duration-200 bg-transparent border-none cursor-pointer p-0"
                            // >
                            //     <LogOut className="w-5 h-5" />
                            //     <span>Logg ut</span>
                            //     <span>{user.firstName || "Pålogget"}</span>
                            // </button>
                            <div className="rounded-xl bg-admin-hover overflow-hidden">
                                <div className="flex items-center gap-3 px-4 py-3 border-b border-admin-border/30">
                                    <CircleUser className="w-5 h-5" />
                                    <div className="leading-tight">
                                        <p className="text-sm font-medium">{user.firstName || "Pålogget"}</p>
                                        <p className="text-xs text-admin-text/70">Administrator</p>
                                    </div>
                                </div>
                                <a
                                    href="/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-2 px-4 py-3 text-sm text-admin-text hover:bg-admin-active transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Se nettside
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-left text-admin-text hover:bg-admin-active transition-colors bg-transparent border-none cursor-pointer"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logg ut
                                </button>
                            </div>
                        ) : (
                            // <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex flex-col items-center gap-2 text-white hover:text-admin-text hover:drop-shadow-lg transition-all duration-200">
                            <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-admin-text hover:bg-admin-hover transition-colors duration-200">
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
