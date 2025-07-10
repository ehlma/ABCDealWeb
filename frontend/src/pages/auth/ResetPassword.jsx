import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/api.js";
import {Eye, EyeOff} from "lucide-react";

const ResetPassword = () => {
    const {token} = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();
        setError("");
        setMsg("");

        if (password.length < 8) {
            setError("Passordet må være minst 8 tegn.");
            return;
        }

        if(!/[A-Z]/.test(password)){
            setError("Passordet må inneholde minst én stor bokstav.");
            return;
        };

        if(!/\d/.test(password)){
            setError("Passordet må inneholde minst ett tall.");
            return;
        }

        if (password != passwordConfirm) {
            setError("Passordene må være like.");
            return;
        }

        try {
            const res = await api.post("/auth/set-new-password", {
                token, 
                password
            });
            setMsg("Passordet er oppdatert. Du kan logge inn.");
            setTimeout(() => navigate("/"), 5000);
        } catch (err) {
            setError("Ugyldig eller utløpt lenke.")
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-sm bg-gray-50 p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Nytt passord</h2>
                {msg && <p className="text-2xl font-bold mb-6 text-center">{msg}</p>}
                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

                <form onSubmit={handleReset} className="space-y-4">
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"}
                            placeholder="Nytt passord"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-2 -translate-y-1/2 p-0 bg-transparent border-none"
                            aria-label={showPassword ? "Skjul passord" : "Vis passord"}
                        >
                            {showPassword ? (
                            <EyeOff className="w-5 h-5 text-gray-500" />
                            ) : (
                            <Eye className="w-5 h-5 text-gray-500" />
                            )}
                        </button>
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Gjenta passord"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                        />

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors"
                    >
                        Lagre passord
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;