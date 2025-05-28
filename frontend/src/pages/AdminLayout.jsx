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
            </nav>
            <main className="flex-1 p-6">
                <Outlet/>
            </main>
        </div>
    );
};

export default AdminLayout;