import { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:5050/api/auth/login", {
                email,
                password
            });

            // lagre token i localStorage
            localStorage.setItem("token", res.data.token);

            // lagre brukerinfo
            localStorage.setItem("user", JSON.stringify(res.data.user));

            // naviger videre eller vis suksess
            alert("Logget inn");
            window.location.href = '/admin/contacts'; // NB: endre til riktig?
        } catch (error) {
            console.error(error);
            setError("Wrong e-mail or password");
        }
    };

    return (
        <div>
            <h2>Logg inn</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="E-post"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required // gir innebygget pop up "vennligst fyll ut dette feltet"
                /> <br/>
                <input
                    type="password"
                    placeholder="Passord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /> <br/>
                <button type="submit">Logg inn</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;