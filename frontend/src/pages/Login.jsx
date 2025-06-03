import { useState } from "react";
import {useNavigate} from "react-router-dom";
import api, {API_ENDPOINTS} from "../api";
import '../index.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        

        try {
            const res = await api.post(API_ENDPOINTS.login, {
                email,
                password
            });

            // lagre token i localStorage
            localStorage.setItem("token", res.data.token);

            // lagre brukerinfo
            localStorage.setItem("user", JSON.stringify(res.data.user));

            // naviger videre eller vis suksess
           navigate("/admin/contacts");
        } catch (error) {
            console.error(error);
            setError("Wrong e-mail or password");
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm p-8 bg-gray-100 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Logg inn</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="E-post"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required // gir innebygget pop up "vennligst fyll ut dette feltet"
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    /> <br/>
                    <input
                        type="password"
                        placeholder="Passord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    /> <br/>
                    <button type="submit" className="w-full bg-[#047464] text-white py-2 rounded hover:bg-[#065f54] transition-colors">Logg inn</button>
                </form>
                {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default Login;