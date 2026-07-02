import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../../api/api";

export const AuthContext = createContext(null);

// AuthProvider-komponent
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Lagrer brukerinfo hvis innlogget
    const [token, setToken] = useState(null); // Access token lagres kun i React state
    const [loading, setLoading] = useState(true); // Håndtere initial lasting

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const response = await api.post("/auth/refresh");
                const { token: newToken, user: refreshedUser } = response.data;

                setToken(newToken);
                setUser(refreshedUser);
                api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
            } catch (error) {
                setToken(null);
                setUser(null);
                delete api.defaults.headers.common.Authorization;
            } finally {
                setLoading(false); // Ferdig med initial lasting
            }
        };

        initializeAuth();
    }, []);

    // Funksjon for innlogging
    const login = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
    };

    // Funksjon for utlogging
    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error("Feil ved utlogging:", error);
        } finally {
            setToken(null);
            setUser(null);
            delete api.defaults.headers.common.Authorization;
        }
    };

    // Verdiene som gjøres tilgjengelige for komponentene
    const authContextValue = {
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
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
};