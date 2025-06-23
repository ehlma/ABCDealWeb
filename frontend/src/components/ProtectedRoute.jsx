import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <div>Laster autentiseringsstatus...</div> // Viser melding mes autentiseringsstatus sjekkes
    }

    if (!isAuthenticated) {
        /* 
        Hvis bruker ikke er autentisert, sendes de til innloggingssiden. 
        "replace" forhindrer at de kan gå tilbake til den beskyttede siden med nettleserens tilbakeknapp
        */
       return <Navigate to="/" replace/> // Endret til "/" 
       /*
        Hvis bruker er logget inn, men ikke har riktig rolle, omdirigeres de. 
        NB: Kan omdirigere til en "adgang-nektet side" - TODO?
        */
       return <Navigate to="/" replace/> // TODO: Eller access-denied side??
    }

    return <Outlet/>
}

export default ProtectedRoute;