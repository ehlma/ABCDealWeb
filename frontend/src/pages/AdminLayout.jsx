import { Link, Outlet } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const AdminLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 z-[50] w-full bg-[#047464] text-white shadow">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Desktop meny (hidden on mobile) */}
          <ul className="hidden sm:flex gap-6 font-medium">
            <li><Link to="/admin/settings" className="text-white hover:underline">Ansatte</Link></li>
            <li><Link to="/admin/articles" className="text-white hover:underline">Artikler</Link></li>
            <li><Link to="/admin/contacts" className="text-white hover:underline">Kontaktskjema</Link></li>
            <li><Link to="/admin/complaints" className="text-white hover:underline">Reklamasjon</Link></li>
          </ul>

          {/* Logo (desktop) */}
          <img src={logo} alt="ABC Deal Logo" className="h-[36px] hidden sm:block ml-auto" />

          {/* Hamburger (mobile only) */}
          <button className="sm:hidden bg-transparent border-none p-0 m-0 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-8 h-8 text-white" /> : <Menu className="w-8 h-8 text-white" />}
          </button>
        </div>

        {/* Mobilmeny: åpnes under navbar */}
        {menuOpen && (
          <div className="absolute w-[200px] top-[64px] left-0 w-full bg-[#047464] text-white px-6 py-4 sm:hidden z-40 shadow-md flex flex-col rounded-b space-y-2">
            <Link to="/admin/settings" onClick={() => setMenuOpen(false)} className="flex flex-row text-white hover:text-[#d1fae5] hover:drop-shadow-lg transition-all duration-200" >Ansatte</Link>
            <Link to="/admin/articles" onClick={() => setMenuOpen(false)} className="flex flex-row text-white hover:text-[#d1fae5] hover:drop-shadow-lg transition-all duration-200">Artikler</Link>
            <Link to="/admin/contacts" onClick={() => setMenuOpen(false)} className="flex flex-row text-white hover:text-[#d1fae5] hover:drop-shadow-lg transition-all duration-200">Kontaktskjema</Link>
            <Link to="/admin/complaints" onClick={() => setMenuOpen(false)} className="flex flex-row text-white hover:text-[#d1fae5] hover:drop-shadow-lg transition-all duration-200">Reklamasjon</Link>
          </div>
        )}
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
