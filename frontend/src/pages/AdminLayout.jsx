import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="fixed top-0 left-0 bg-[#047464] w-full text-white px-6 py-4 shadow">
                <ul className="flex gap-6 font-medium">
                    <li>
                        <Link to="/admin/settings" className="hover:underline hover:text-[#a7f3d0] transition-colors text-white">
                            Ansatte
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/contacts" className="hover:underline hover:text-[#a7f3d0] transition-colors text-white">
                            Kontaktskjema
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/complaints" className="hover:underline hover:text-[#a7f3d0] transition-colors text-white">
                            Reklamasjon
                        </Link>
                    </li>

                </ul>
            <div className="pointer-events-none fixed top-[55px] left-0 w-full h-20 z-10 bg-gradient-to-b from-white/90 to-transparent"></div>
            </nav>


            <main className="flex-1 p-6 overflow-y-auto">
                <Outlet/>
            </main>
        </div>
    );
};

export default AdminLayout;