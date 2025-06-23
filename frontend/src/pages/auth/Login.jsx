import { useState } from "react";
import {useNavigate} from "react-router-dom";
import api, {API_ENDPOINTS} from "../../api";
import '../../index.css';
import logo from "../../assets/Logo.png";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showReset, setShowReset] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetMsg, setResetMsg] = useState("");
    const { login } = useAuth();


    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post(API_ENDPOINTS.login, {
                email,
                password
            });

            // Kall login-funksjon fra context i stedet for direkte localStorage
            login(res.data.token, res.data.user); // Bruker context-funksjonen

            // naviger videre eller vis suksess
           navigate("/admin/contacts");
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Wrong e-mail or password");
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm p-8 bg-gray-100 rounded shadow-md">
                <img src={logo} alt="ABC Deal logo" className="h-[60px] mx-auto mb-8" />
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
                    <div className="text-sm mt-2">
                        <button type="button" 
                            onClick={() => setShowReset(!showReset)}
                            className="text-[#047464] hover:underline hover:text-red-400 transition-all duration-200">
                            Glemt passord ? 
                        </button>
                    </div>
                </form>
                {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
                {showReset && (
                    <div className="mt-4 space-y-2">
                        <input 
                            type="email" 
                            placeholder="Skriv inn e-post"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        <button 
                            onClick={async () => {
                                console.log("Reset epost sendt: ", resetEmail);
                                setResetMsg("");
                                try {
                                    const res = await api.post("/auth/reset-password", { email: resetEmail.trim().toLowerCase()
                                    });

                                        setResetMsg("Passord sendt til e-post");
                                } catch {
                                        setResetMsg("E-post ikke funnet");
                                }
                            }}
                            className="w-full bg-[#047464] text-white py-2 rounded hover:bg-[#065f54] transition-colors"
                        >
                            Send nytt passord 
                        </button>
                        {resetMsg && <p className="text-sm text-center text-gray-700">{resetMsg}</p>}

                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;