import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import LogoutArtista from "../component/artistaLogout";
import { useNavigate } from "react-router-dom";

const ArtistaDashboard = () => {
    const navigate = useNavigate();
    const { store } = useContext(Context); 

    useEffect(() => {
        if (!store.authArtista) {
            navigate("/artista-login");  
        } else if (!store.artistaDashboardData) {
            store.actions.getArtistaDashboard();  
        }
    }, [store.authFan, store.fanDashboardData]);  

    if (!store.authArtista) return null; 
    if (!store.artistaDashboardData) return <p>Cargando...</p>; 

    return (
        <div className="dashboard-container">
            <h1>Bienvenido, {store.artistaDashboardData?.username || "Artista"}</h1>
            <p>Email: {store.artistaDashboardData?.email || "No disponible"}</p>
            <div className="button-container">
                <LogoutArtista />
            </div>
        </div>
    );
};

export default ArtistaDashboard;




