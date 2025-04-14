import React, { useContext, useEffect, useState } from "react";
import LogoutFeedArtista from "../component/logoutArtistaFeed";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const ArtistaFeed = () => {
    const navigate = useNavigate();
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (store.authArtistaFeed == false) {
            navigate("/loginF-artista");
        } else {
            actions.getWallpapersByUser();
            actions.getTagsWallpapers();
        }
    }, [store.authArtistaFeed]);


    useEffect(() => {
        if (store.authArtistaFeed) {
            actions.getFansFollowing();
        }
    }, [store.authArtistaFeed]);

    const handleDelete = async () => {
        if (selectedPaper) {
            try {
                
                const tagWallpaperRelations = store.TagsWallpapers.filter(
                    (relation) => relation.wallpaper.id === selectedPaper
                );

                
                for (const relation of tagWallpaperRelations) {
                    await actions.deleteTagWallpaper(relation.tag.id, relation.wallpaper.id);
                }

                
                await actions.deleteWallpaper(selectedPaper);

                
                setSuccessMessage("Wallpaper eliminado exitosamente.");
                setTimeout(() => {
                    actions.getWallpapersByUser();
                    setSelectedPaper(null);
                    setSuccessMessage(null);
                }, 1500);
            } catch (error) {
                console.error("Error al eliminar el wallpaper o los tags asociados:", error);
            }
        }
    };

    if (store.authArtistaFeed == null) {
        return (
            <div className="spinner-border d-1" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
        )
    }
    if (store.wallpapers === null) return <p>Cargando...</p>;

    const wallpapers = Array.isArray(store.wallpapers) ? store.wallpapers : [];

    return (
        <div className="dashboard-container" style={{ backgroundColor: "#1e1e2f", color: "#f5f5f5", padding: "2rem", borderRadius: "10px" }}>
            <style>
                {`
                    .card-style {
                        background-color: #252540;
                        color: #f5f5f5;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    }
                    .btn-style {
                        border-radius: 5px;
                        padding: 0.5rem 1rem;
                    }
                    .btn-morado {
                        background-color: #6a0dad; /* Morado */
                        color: #ffffff;
                    }
                    .btn-azul {
                        background-color: #007bff; /* Azul */
                        color: #ffffff;
                    }
                    .list-group-item {
                        background-color: #252540;
                        color: #ffffff;
                        border-radius: 5px;
                        margin-bottom: 0.5rem;
                    }
                    .header-text {
                        color: #f5f5f5; /* Letras blancas */
                        font-size: 28px; /* Tamaño del texto */
                        font-weight: bold; /* Texto grueso */
                        text-align: center; /* Centra el texto */
                        margin-top: 20px; /* Espaciado superior */
                    }
                    .fans-container {
                        text-align: center; /* Centra el contenido */
                        margin: 2rem 0; /* Añade espaciado vertical */
                    }
                    .fans-list {
                        display: inline-block; /* Centra la lista como bloque */
                        text-align: left; /* Opcional: alineación izquierda para los ítems */
                    }
                `}
            </style>
    
            <h1 style={{ fontSize: "32px", textAlign: "center", marginBottom: "2rem" }}>
                Bienvenido, {store.artistaFeed?.username || "Artista"}
            </h1>
    
            
            <div className="fans-container">
                <h4 style={{ fontWeight: "bold", marginBottom: "1rem" }}>Tus Seguidores</h4>
                {store.fansFollowing.length > 0 ? (
                    <ul style={{ display: "inline-block", textAlign: "left" }}>
                        {store.fansFollowing.map((fan) => (
                            <li  key={fan.id}>
                                {fan.username}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aún no tienes fans que te sigan.</p>
                )}
            </div>
    
            <div className="wallpapers-container">
                <h2 className="header-text">Tus Wallpapers</h2>
                
                
                <div className="d-flex mb-4" style={{ justifyContent: "center", gap: "10px" }}>
                    <button
                        className="btn btn-morado btn-style"
                        onClick={() => selectedPaper && navigate(`/agregar-tag-a-wallpaper/${selectedPaper}`)}
                        disabled={!selectedPaper}
                    >
                        Editar Wallpaper Seleccionado
                    </button>
                    <button
                        className="btn btn-azul btn-style"
                        onClick={handleDelete}
                        disabled={!selectedPaper}
                    >
                        Eliminar Wallpaper Seleccionado
                    </button>
                </div>
        
                {successMessage && (
                    <div className="alert alert-success" role="alert">
                        {successMessage}
                    </div>
                )}
        
                <div className="d-flex flex-wrap justify-content-start">
                    {wallpapers.length > 0 ? (
                        wallpapers.map((wallpaper) => {
                            const tags = store.TagsWallpapers.filter(
                                (relation) => relation.wallpaper.id === wallpaper.id
                            ).map((relation) => relation.tag.name);
        
                            return (
                                <div
                                    className={`card m-3 ${selectedPaper === wallpaper.id ? "border-primary" : ""} card-style`}
                                    style={{
                                        width: "18rem",
                                        cursor: "pointer",
                                        border: selectedPaper === wallpaper.id ? "2px solid #f5f5f5" : "",
                                    }}
                                    key={wallpaper.id}
                                    onClick={() => setSelectedPaper(wallpaper.id)}
                                >
                                    <img
                                        src={wallpaper.imagen || "https://via.placeholder.com/150"}
                                        className="card-img-top"
                                        alt={wallpaper.nombre || "Sin título"}
                                        style={{
                                            width: "100%",
                                            height: "150px",
                                            objectFit: "cover",
                                            borderTopLeftRadius: "10px",
                                            borderTopRightRadius: "10px",
                                        }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ textAlign: "center", fontWeight: "bold", marginBottom: "0.5rem" }}>
                                            {wallpaper.nombre || "Sin título"}
                                        </h5>
                                        <p className="card-text" style={{ textAlign: "center", fontSize: "14px", marginBottom: "0.5rem" }}>
                                            Fecha: {wallpaper.fecha || "No disponible"}
                                        </p>
                                        <p className="card-text" style={{ textAlign: "center", fontSize: "14px", marginBottom: "0.5rem" }}>
                                            Categorías: {tags.length > 0 ? tags.join(", ") : "Sin tags"}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="alert alert-danger" role="alert">
                            No tienes wallpapers creados.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
    

};

export default ArtistaFeed;