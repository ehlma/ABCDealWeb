import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { API_ENDPOINTS } from "../../../api/api.js";
import '../../index.css';
import logo from "../../assets/3s-logo.png";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

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
            navigate("/admin");
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Wrong e-mail or password");
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm p-8 bg-warm-off-white rounded shadow-md">
                <Link to="/" aria-label="Gå til forsiden">
                    <img src={logo} alt="3S Bobil & Caravan logo" className="h-[60px] mx-auto mb-8" />
                </Link>
                <h2 className="text-2xl font-bold text-ui-background mb-6 text-center">
                    {showReset ? "Glemt passord" : "Logg inn"}
                </h2>

                {!showReset ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            placeholder="E-post"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        <input
                            type="password"
                            placeholder="Passord"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        <button
                            type="submit"
                            className="w-full rounded border border-ui-background bg-ui-background py-2 text-warm-off-white transition-colors duration-300 hover:bg-transparent hover:text-ui-background"
                        >
                            Logg inn
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowReset(true);
                                setResetMsg("");
                                setError("");
                            }}
                            className="w-full text-sm text-ui-background bg-warm-off-white hover:underline hover:text-primary transition-all duration-200"
                        >
                            Glemt passord?
                        </button>
                    </form>
                ) : (
                    <div className="space-y-3">
                        <p className="text-sm text-center text-gray-600">
                            Skriv inn e-postadressen din, så sender vi deg instruksjoner for å opprette et nytt passord.
                        </p>
                        <input
                            type="email"
                            placeholder="Skriv inn e-post"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        <button
                            onClick={async () => {
                                setResetMsg("");
                                try {
                                    await api.post("/auth/reset-password", {
                                        email: resetEmail.trim().toLowerCase()
                                    });

                                    setResetMsg("Hvis e-postadressen finnes hos oss, er en tilbakestillingslenke sendt.");
                                } catch {
                                    setResetMsg("Noe gikk galt. Prøv igjen senere.");
                                }
                            }}
                            className="w-full rounded border border-ui-background bg-ui-background py-2 text-warm-off-white transition-colors duration-300 hover:bg-transparent hover:text-ui-background"
                        >
                            Send nytt passord
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowReset(false);
                                setResetMsg("");
                            }}
                            className="w-full text-sm text-ui-background bg-warm-off-white hover:underline hover:text-primary transition-all duration-200"
                        >
                            ← Tilbake til innlogging
                        </button>
                        {resetMsg && <p className="text-sm text-center text-gray-700">{resetMsg}</p>}
                    </div>
                )}

                {error && <p className="text-red-600 text-sm mt-4 text-center">{error}</p>}

                <div className="mt-6 border-t border-gray-200 pt-4">
                    <Link
                        to="/"
                        className="mx-auto inline-flex items-center justify-center rounded-full bg-primary-light px-5 py-2 text-sm font-semibold text-primary-dark transition-colors duration-300 hover:bg-primary hover:text-warm-off-white"
                    >
                        ← Tilbake til nettsiden
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;