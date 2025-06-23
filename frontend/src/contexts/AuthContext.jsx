import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { Children } from "react";

export const AuthContext = createContext(null);

// AuthProvider-komponent
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null); // Lagrer brukerinfo hvis innlogget
    const [loading, setLoading] = useState(true); // Håndtere initial lasting

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user"); // Hent brukerinfo

        if (token && storedUser) {
            try {
                const decodedToken = jwtDecode(token);

                // Sjekk om token er utløpt
                if (decodedToken.exp * 1000 > Date.now()) {
                    setUser(JSON.parse(storedUser)); // Sett brukerinfo fra localStorage
                } else {
                    // Token utløpt, rydd opp
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
            } catch (error) {
                console.error("Feil ved dekoding av token eller parsing av brukerinfo: ", error);
                localStorage.removeItem("token"); // Fjern ugyldig token
                localStorage.removeItem("user");
            }
        }

        setLoading(false); // Ferdig med initial lasting
    }, []);

    // Funksjon for innlogging
    const login = (token, userData) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData)); // Lagre brukerdata som streng
        setUser(userData); // Sett brukerdata som objekt
    };

    // Funksjon for utlogging
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    // Verdiene som gjøres tilgjengelige for komponentene
    const authContextValue = {
        user,
        isAuthenticated: !!user, // Sann hvis user er et objekt/ikke null
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value = {authContextValue}>
            {!loading && children} {/* Vis barn kun når lasting er ferdig */}
        </AuthContext.Provider>
    );
};

// Hook for enkel bruk av kontekst
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}