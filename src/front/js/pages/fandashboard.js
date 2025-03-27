import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import LogoutButton from "../component/logoutButton";
import { useNavigate } from "react-router-dom";

const FanDashboard = () => {
    const navigate = useNavigate();
    const { store } = useContext(Context); 

    useEffect(() => {
        if (!store.authFan) {
            navigate("/fan/login");  
        } else if (!store.fanDashboardData) {
            store.actions.getFanDashboard();  
        }
    }, [store.authFan, store.fanDashboardData]);  

    if (!store.authFan) return null; 
    if (!store.fanDashboardData) return <p>Cargando...</p>; 

    return (
        <div className="dashboard-container">
            <h1>Bienvenido, {store.fanDashboardData?.username || "fan"}</h1>
            <p>Email: {store.fanDashboardData?.email || "No disponible"}</p>
            <div className="button-container">
                <LogoutButton />
            </div>
        </div>
    );
};

export default FanDashboard;




