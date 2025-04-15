import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const LogoutFeedArtista = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {

        actions.logoutFeedArtista();
        navigate("/feed-artista");
    };

    if (!store.authArtistaFeed) {
        return null;
    }

    return (
        <>
            {store.accces_token}
            <button
    type="button"
    className="btn"
    onClick={handleLogout}
    style={{
        backgroundColor: "transparent", 
        color: "#ffffff", 
        border: "none", 
        fontSize: "1.2rem", 
        fontWeight: "bold", 
        cursor: "pointer", 
        transition: "color 0.3s ease",
    }}
    onMouseEnter={(e) => {
        e.target.style.color = "#6a11cb";
    }}
    onMouseLeave={(e) => {
        e.target.style.color = "#ffffff"; 
    }}
>
    Logout
</button>

        </>
    );
        
};

export default LogoutFeedArtista;