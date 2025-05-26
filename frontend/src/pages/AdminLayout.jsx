import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div>
            <nav>
                <Link to="/admin/contacts">Kontaktskjema</Link>
                <Link to="/admin/complaints">Reklamasjon</Link>
            </nav>
            <main>
                <Outlet/>
            </main>
        </div>
    );
};

export default AdminLayout;