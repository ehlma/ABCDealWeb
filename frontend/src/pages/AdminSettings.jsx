import { useEffect, useState } from "react";
import api, { API_ENDPOINTS } from "../api";
import { roles } from '../constants/roles';

const AdminSettings = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "admin"
    });

    const [editUserId, setEditUserId] = useState(null);
    const [editData, setEditData] = useState({});
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

    const handleEdit = async (user) => {
        setEditUserId(user._id);
        setEditData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        });
    };

    const handleEditChange = (e) => {
        setEditData({...editData, [e.target.name]: e.target.value});
    };

    const handleUpdate = async (id) => {
        try {
            await api.put(`${API_ENDPOINTS.users}/${id}`, editData);
            await fetchUsers();
            setEditUserId(null);
            setEditData({});
        } catch (e) {
            setError("Kunne ikke oppdatere bruker");
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}

            <h3>Legg til ny ansatt</h3>
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
                    <select
                        name="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        required
                    >
                        {roles.map((role) => (
                            <option key={role.value} value={role.value}>
                                {role.label}
                            </option>   
                        ))}
                    </select><br/>

                    <button type="submit">Opprett admin</button>
            </form>

            <h2>Ansatte</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {editUserId === user._id ? (
                            <>
                                <input 
                                    name="firstName" 
                                    value={editData.firstName}
                                    onChange={handleEditChange}
                                />
                                <input 
                                    name="lastName"
                                    value={editData.lastName}
                                    onChange={handleEditChange}
                                />
                                <input 
                                    name="email" 
                                    value={editData.email}
                                    onChange={handleEditChange}
                                />
                                <select
                                    name="role" 
                                    value={editData.role}
                                    onChange={handleEditChange}                                
                                >
                                    {roles.map((role) => (
                                        <option key={role.value} value={role.value}>
                                            {role.label}
                                        </option>
                                    ))}  
                                </select>

                                <button onClick={() => handleUpdate(user._id)} style={{marginLeft: "16px"}}>
                                    Lagre
                                </button>
                                <button onClick={() => setEditUserId(null)} style={{marginLeft: "16px"}}>
                                    Avbryt
                                </button> 
                            </>
                        ) : (
                            <>
                                {user.firstName} {user.lastName} - {user.email} ({user.role})
                                <button onClick={() => handleDelete(user._id)} style={{marginLeft: "16px"}}>
                                    Slett
                                </button>
                                <button onClick={() => handleEdit(user)} style={{marginLeft: "16px"}}>
                                    Rediger
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default AdminSettings;