import { useEffect, useState } from "react";
import api, { API_ENDPOINTS } from "../api";
import { roles } from '../constants/roles';
import { Eye, EyeOff, ChevronDown } from "lucide-react";


const AdminSettings = () => {
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
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
        <div className="max-w-md mx-auto">
            {error && <p className="text-red-600 font-medium mb-4">{error}</p>}

            <h3 className="text-xl mb-4">Legg til ny ansatt</h3>
            <div >
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Fornavn"
                        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        required
                    /> <br />

                    <input 
                        type="text" 
                        placeholder="Etternavn"
                        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        required
                    /> <br />

                    <input
                        type="email"
                        placeholder="E-post"
                        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    /><br/>

                    <div className="relative inline-block w-full mb-2">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Passord"
                            value={formData.password}
                            className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-2 -translate-y-1/2 p-0 bg-transparent border-none cursor-pointer focus:outline-none"
                            aria-label={showPassword ? "Skjul passord" : "Vis passord"}
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5 text-gray-500"/>
                            ) : (
                                <Eye className="w-5 h-5 text-gray-500"/>
                            )}
                        </button>
                    </div> <br />
                    <div className="relative">
                        <select
                            name="role"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            required
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-2 appearance-none"
                        >
                            {roles.map((role) => (
                                <option key={role.value} value={role.value}>
                                    {role.label}
                                </option>   
                            ))}
                        </select><br/>
                        <ChevronDown className="absolute right-2 top-[45%] -translate-y-1/2 text-gray-500 pointer-events-none h-5 w-5"/>
                    </div>

                    <button 
                        type="submit"
                        className="bg-blue-100 font-medium py-2 px-4 rounded hover:bg-blue-200"
                    >Opprett ansatt</button>
                </form>
            </div>
            <br />
            <div className="max-full mx-auto mt-12 px-4">
                {/*Viser alle ansatte*/}
                <h2 className="text-xl mb-4">Ansatte</h2>
                <ul className="grid grid-cols-1 gap-6">
                    {users.map((user) => (
                        <li key={user._id} className="bg-white shadow rounded p-4 w-full">
                            {editUserId === user._id ? (
                                <div className="space-y-2">
                                    <input 
                                        name="firstName" 
                                        value={editData.firstName}
                                        onChange={handleEditChange}
                                        className="border border-gray-300 rounded px-3 py-2 w-full"
                                    />
                                    <input 
                                        name="lastName"
                                        value={editData.lastName}
                                        onChange={handleEditChange}
                                        className="border border-gray-300 rounded px-3 py-2 w-full"
                                    />
                                    <input 
                                        name="email" 
                                        value={editData.email}
                                        onChange={handleEditChange}
                                        className="border border-gray-300 rounded px-3 py-2 w-full"

                                    />
                                    <select
                                        name="role" 
                                        value={editData.role}
                                        onChange={handleEditChange} 
                                        className="border border-gray-300 rounded px-3 py-2 w-full"                               
                                    >
                                        {roles.map((role) => (
                                            <option key={role.value} value={role.value}>
                                                {role.label}
                                            </option>
                                        ))}  
                                    </select>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleUpdate(user._id)} 
                                            className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600 mr-2"
                                        >
                                            Lagre
                                        </button>
                                        <button onClick={() => setEditUserId(null)} 
                                            className="bg-gray-300 text-gray-800 px-2 py-1 text-sm rounded hover:bg-gray-400"
                                        >
                                            Avbryt
                                        </button> 
                                    </div>
                                </div> 
                            ) : (
                                <div className="flex justify-between items-center flex-wrap gap-4">
                                    <p className="mb-2">
                                            {user.firstName} {user.lastName} - {user.email} ({user.role})
                                    </p>
                                    <div className="flex gap-2">
                                        {deleteConfirmId === user._id ? (
                                            <>
                                                <p className="text-blue-500">Er du sikker?</p>
                                                <button className="bg-green-500 text-white text-sm px-2 py-1 rounded hover:bg-green-600 mr-2 focus:outline-none focus:ring-0"
                                                    onClick={() => handleDelete(user._id)}
                                                >
                                                    Aksepter
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirmId(null)}
                                                    className="ml-2 bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-0"
                                                >
                                                    Avbryt
                                                </button>
                                            </>  
                                        ) : (
                                            <>
                                                <button onClick={() => setDeleteConfirmId(user._id)} 
                                                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm focus:outline-none focus:ring-0"
                                                >
                                                    Slett
                                                </button>

                                                <button onClick={() => handleEdit(user)} 
                                                    className="ml-2 bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300 text-sm focus:outline-none focus:ring-0"
                                                >
                                                    Rediger
                                                </button>
                                            </>
                                        )}  
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminSettings;