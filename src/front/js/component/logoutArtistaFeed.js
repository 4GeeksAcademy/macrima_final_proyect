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
        backgroundColor: "transparent", // Sin fondo
        color: "#ffffff", // Letras blancas por defecto
        border: "none", // Sin borde
        fontSize: "1.2rem", // Tamaño de fuente más grande
        fontWeight: "bold", // Texto grueso y en negrita
        cursor: "pointer", // Cambia el cursor al estilo de selección
        transition: "color 0.3s ease", // Transición suave para el color de las letras
    }}
    onMouseEnter={(e) => {
        e.target.style.color = "#6a11cb"; // Letras cambian a moradas al pasar el ratón
    }}
    onMouseLeave={(e) => {
        e.target.style.color = "#ffffff"; // Letras vuelven a blancas al salir el ratón
    }}
>
    Logout
</button>

        </>
    );
        
};

export default LogoutFeedArtista;