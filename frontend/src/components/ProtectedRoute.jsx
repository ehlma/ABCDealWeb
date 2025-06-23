import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <div>Laster autentiseringsstatus...</div> // Viser melding mens autentiseringsstatus sjekkes
    }

    if (!isAuthenticated) {
        /* 
        Hvis bruker ikke er autentisert, sendes de til innloggingssiden. 
        "replace" forhindrer at de kan gå tilbake til den beskyttede siden med nettleserens tilbakeknapp
        */
       return <Navigate to="/" replace/> // Endret til "/" TODO: Eller access-denied side??
    }

    // Hvis bruker er logget inn, fortsett å vise innholdet av den nestede ruten
    return <Outlet/>;
}

export default ProtectedRoute;