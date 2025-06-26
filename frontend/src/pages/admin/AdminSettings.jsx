import { useEffect, useState } from "react";
import api, { API_ENDPOINTS } from "../../../api/api.js";
import { roles } from '../../constants/roles';
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
    const [searchTerm, setSearchTerm] = useState("");


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

    const filteredUsers = users.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    const usersToDisplay = searchTerm ? filteredUsers : users;

    return (
        <div className="w-full mt-[-20px] grid grid-cols-3 gap-[16px] px-[8px] max-w-screen-xl mx-auto">
          {/* Tom kolonne venstre */}
          <div></div>
      
          {/* Skjema  */}
          <div className="mt-[48px] col-span-3 sm:col-span-4 md:col-span-1 px-[16px]">
            {error && <p className="text-red-600 font-medium mb-[16px]">{error}</p>}
            <h3 className="text-xl mb-[16px]">Legg til ny ansatt</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Fornavn"
                className="border border-gray-300 rounded px-[12px] py-[8px] mb-[8px] w-full"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Etternavn"
                className="border border-gray-300 rounded px-[12px] py-[8px] mb-[8px] w-full"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="E-post"
                className="border border-gray-300 rounded px-[12px] py-[8px] mb-[8px] w-full"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <div className="relative inline-block w-full mb-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Passord"
                  value={formData.password}
                  className="w-full border border-gray-300 rounded px-[12px] py-[8px] pr-[40px]"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-[8px] -translate-y-1/2 p-0 bg-transparent border-none cursor-pointer focus:outline-none"
                  aria-label={showPassword ? "Skjul passord" : "Vis passord"}
                >
                  {showPassword ? <EyeOff className="w-[20px] h-[20px] text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                </button>
              </div>
      
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-[12px] py-[8px] mb-[8px] appearance-none"
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-[8px] top-[45%] -translate-y-1/2 text-gray-500 pointer-events-none h-[20px] w-[20px]" />
              </div>
      
              <button
                type="submit"
                className="mt-[8px] bg-blue-100 font-medium py-[8px] px-[16px] rounded hover:bg-blue-200"
              >
                Opprett ansatt
              </button>
            </form>
          </div>
      
          {/* Tom kolonne høyre */}
      
          {/* Ansattkort - tar hele bredden under grid */}
          <div className="col-span-3 mt-[56px] w-full">
            <div className="w-full shadow-[0_4px_2px_-2px_rgba(0,0,0,0.2)] px-[24px] py-[24px] mb-[32px]">
                <h2 className="text-xl mb-[32px] pb-[4px] text-center mx-auto">Ansatte</h2>            
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-[16px] mb-[8px] w-full">
                    <label htmlFor="search" className="block text-base font-medium mb-[8px] ml-[8px] text-left sm:text-center">Søk etter ansatt</label>
                    <input
                        type="text"
                        placeholder="Søk etter navn..."
                        className="px-[12px] py-[8px] border border-gray-300 rounded w-full max-w-[300px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    </div>
            </div>

            <div className="col-span-3 px-[16px] md:px-[32px]">
                <ul className="grid  gap-[24px]">
                {usersToDisplay.map((user) => (
                    <li key={user._id} className="bg-white shadow rounded p-[24px] w-full">
                    {editUserId === user._id ? (
                        <div className="space-y-[8px]">
                        <input name="firstName" value={editData.firstName} onChange={handleEditChange} className="border border-gray-300 rounded px-[12px] py-[8px] w-full" />
                        <input name="lastName" value={editData.lastName} onChange={handleEditChange} className="border border-gray-300 rounded px-[12px] py-[8px] w-full" />
                        <input name="email" value={editData.email} onChange={handleEditChange} className="border border-gray-300 rounded px-[12px] py-[8px] w-full" />
                        <select name="role" value={editData.role} onChange={handleEditChange} className="border border-gray-300 rounded px-[12px] py-[8px] w-full">
                            {roles.map((role) => (
                            <option key={role.value} value={role.value}>
                                {role.label}
                            </option>
                            ))}
                        </select>
                        <div className="flex flex-row justify-center gap-[8px]">
                            <button onClick={() => handleUpdate(user._id)} className="bg-blue-500 text-white px-[8px] py-[4px] text-sm rounded hover:bg-blue-600 mr-[8px]">Lagre</button>
                            <button onClick={() => setEditUserId(null)} className="bg-gray-300 text-gray-800 px-[8px] py-[4px] text-sm rounded hover:bg-gray-400">Avbryt</button>
                        </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-[16px]">
                        <p className="mb-[8px]">{user.firstName} {user.lastName} - {user.email} ({user.role})</p>

                        <div className="flex flex-row justify-center">
                            {deleteConfirmId === user._id ? (
                            <>
                                <p className="text-blue-500">Er du sikker?</p>
                                <button onClick={() => handleDelete(user._id)} className="bg-green-500 text-white text-sm px-[8px] py-[4px] rounded hover:bg-green-600 mr-[8px]">Aksepter</button>
                                <button onClick={() => setDeleteConfirmId(null)} className="ml-[8px] bg-red-500 text-white text-sm px-[8px] py-[4px] rounded hover:bg-red-600">Avbryt</button>
                            </>
                            ) : (
                            <>
                                <button onClick={() => setDeleteConfirmId(user._id)} className="ml-[8px] px-[8px] py-[4px] bg-red-500 text-white rounded hover:bg-red-600 text-sm">Slett</button>
                                <button onClick={() => handleEdit(user)} className="ml-[4px] bg-gray-200 text-gray-800 px-[8px] py-[4px] rounded hover:bg-gray-300 text-sm">Rediger</button>
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
        </div>
    );  
};

export default AdminSettings;