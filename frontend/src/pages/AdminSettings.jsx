import { useEffect, useState } from "react";
import api, { API_ENDPOINTS } from "../api";

const AdminSettings = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "admin"
    });

    const [error, setError] = useState("");

    // Hent brukere
    const fetchUsers = async () => {
        try {
            const res = await api.get(API_ENDPOINTS.users);
            setUsers(res.data);
        } catch (err) {
            setError("Kunne ikke hente brukere");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Lett til ny admin
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post(API_ENDPOINTS.users, formData);
            await api.post(API_ENDPOINTS.users, formData);
            setFormData({ firstName: "", lastName: "", email: "", password: "", role: "admin" });
            fetchUsers();
        } catch (err) {
            setError("Feil ved opprettelse av bruker");

        }
    };

    // Slett bruker
    const handleDelete = async (id) => {
        try {
            await api.delete(`${API_ENDPOINTS.users}/${id}`);
            fetchUsers();
        } catch (err) {
            setError("Kunne ikke slette bruker")
        }
    };

    return (
        <div>
            <h2>Admin-brukere</h2>
            {error && <p>{error}</p>}

            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.firstName} {user.lastName} - {user.email} ({user.role})
                        <button onClick={() => handleDelete(user._id)} style={{marginLeft: "10px"}}>
                            Slett
                        </button>
                    </li>
                ))}
            </ul>

            <h3>Legg til ny admin</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Fornavn"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    required
                    /> <br />

                    <input 
                        type="text" 
                        placeholder="Etternavn"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        required
                    /> <br />

                    <input
                        type="email"
                        placeholder="E-post"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    /><br/>

                    <input
                        type="password"
                        placeholder="Passord"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    /><br/>

                    <button type="submit">Opprett admin</button>
            </form>
        </div>
    );
};

export default AdminSettings;