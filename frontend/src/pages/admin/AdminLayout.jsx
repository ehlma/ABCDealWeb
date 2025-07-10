import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { useState } from "react";
import { Menu, X, CircleUser, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const AdminLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth(); // Bruker useAuth-hook
  const navigate = useNavigate(); // Initialiser useNavigate

  const handleLogout = () => {
    logout(); // Kall logout-funksjon fra context
    setMenuOpen(false); // Lukk menyen etter utlogging
    navigate('/'); // Omdiriger til innloggingsside etter utlogging
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 z-[50] w-full bg-ui-background text-white shadow ">
        <div className="flex items-center justify-between px-6 py-4">

          {/* Logo (desktop) */}
          <Link to="/">
            <img src={logo} alt="ABC Deal Logo" className="h-[36px] cursor-pointer" />
          </Link>



          {/* Desktop meny */}
          <ul className="hidden sm:flex gap-6 font-medium flex-grow justify-center">
            <li><Link to="/admin/settings" className="text-white hover:text-primary-light hover:drop-shadow-lg transition-all duration-200">Ansatte</Link></li>
            <li><Link to="/admin/articles" className="text-white hover:text-primary-light hover:drop-shadow-lg transition-all duration-200">Artikler</Link></li>
            <li><Link to="/admin/contacts" className="text-white hover:text-primary-light hover:drop-shadow-lg transition-all duration-200">Kontaktskjema</Link></li>
            <li><Link to="/admin/complaints" className="text-white hover:text-primary-light hover:drop-shadow-lg transition-all duration-200">Reklamasjon</Link></li>
          </ul>

          {/* Handlingsbasert lenke i desktop meny */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              // Vises når bruker er logget inn (desktop)
              <button 
                onClick={handleLogout}
                className="hidden sm:flex flex-col items-center gap-1 text-white hover:text-primary-light hover:drop-shadow-lg transition-all duration-200 bg-transparent border-none cursor-pointer p-0"
              >
                <LogOut className="w-5 h-5"/>
                <span>Logg ut</span>
                <span>{user.firstName || "Pålogget"}</span>
              </button>
            ) : (
              // Vises når bruker ikke er logget inn (desktop)
              <Link to="/" className="hidden sm:flex flex-col items-center gap-1 text-white hover:text-primary-light hover:drop-shadow-lg transition-all duration-200">
              <CircleUser className="w-5 h-5"></CircleUser>
              <span>Logg inn</span>
            </Link>
            )}

            {/* Hamburger (mobile only) */}
            <button className="sm:hidden bg-transparent border-none p-0 m-0 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-8 h-8 text-white" /> : <Menu className="w-8 h-8 text-white" />}
            </button>
          </div>



          {/* Mobilmeny: åpnes under navbar */}
          {menuOpen && (
            <div className="absolute w-[30%] top-[64px] left-0 w-full bg-primary text-white px-6 py-4 sm:hidden z-40 shadow-md flex flex-col rounded-b space-y-2">
              <Link to="/admin/settings" onClick={() => setMenuOpen(false)} className="flex flex-row text-white hover:text-primary-light hover:drop-shadow-lg transition-all duration-200" >Ansatte</Link>
              <Link to="/admin/articles" onClick={() => setMenuOpen(false)} className="flex flex-row text-white hover:text-primary-light hover:drop-shadow-lg transition-all duration-200">Artikler</Link>
              <Link to="/admin/contacts" onClick={() => setMenuOpen(false)} className="flex flex-row text-white hover:text-primary-light hover:drop-shadow-lg transition-all duration-200">Kontaktskjema</Link>
              <Link to="/admin/complaints" onClick={() => setMenuOpen(false)} className="flex flex-row text-white hover:text-primary-light hover:drop-shadow-lg transition-all duration-200">Reklamasjon</Link>
              <hr className="border-t border-primary-light/30 my-2"/>
              {isAuthenticated ? (
                // Vises når bruker er logget inn (mobil)
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center gap-2 text-white hover:text-primary-light hover:drop-shadow-lg transition-all duration-200 bg-transparent border-none cursor-pointer p-0"
                >
                  <LogOut className="w-5 h-5"/>
                  <span>Logg ut</span>
                  <span>{user.firstName || "Pålogget"}</span>
                </button>
              ) : (
                // Vises når bruker ikke er logget inn (mobil)
                <Link to="/" onClick={() => setMenuOpen(false)} className="flex flex-col items-center gap-2 text-white hover:text-primary-light hover:drop-shadow-lg transition-all duration-200">
                <CircleUser className="w-5 h-5" />
                <span>Logg inn</span>
              </Link>
              )}
            </div>
          )}
        </div>
      </nav>
      <div className="pointer-events-none fixed top-[60px] left-0 w-full h-20 z-10 bg-gradient-to-b from-white/90 to-transparent"></div>
      

      {/* Main content */}
      <main className="flex-1 pt-[96px] px-[24px] pb-[24px] overflow-y-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
