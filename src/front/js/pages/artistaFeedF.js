import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
        );
    }

    if (store.wallpapers === null) return <p>Cargando...</p>;

    const wallpapers = Array.isArray(store.wallpapers) ? store.wallpapers : [];

    return (
        <div className="dashboard-container" style={{ backgroundColor: "#121212", color: "#f5f5f5", padding: "2rem", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)" }}>
            <style>
                {`
                    .card-style {
                        background-color: #1f1f2f;
                        color: #f5f5f5;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                        transition: transform 0.2s ease-in-out;
                    }
                    .card-style:hover {
                        transform: scale(1.05);
                    }
                    .btn-style {
                        border-radius: 5px;
                        padding: 0.75rem 1.25rem;
                        font-size: 0.9rem;
                        font-weight: bold;
                    }
                    .btn-morado {
                        background-color:rgb(110, 35, 139); 
                        color: #ffffff;
                        border: none;
                    }
                    .btn-morado:hover {
                        background-color:rgb(110, 35, 139); 
                    }
                    .btn-azul {
                        background-color: #3498db; 
                        color: #ffffff;
                        border: none;
                    }
                    .btn-azul:hover {
                        background-color: #2980b9;
                    }
                    .fans-container {
                        background-color: #1a1a2e;
                        padding: 1rem;
                        border-radius: 10px;
                        margin-bottom: 2rem;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    }
                    .fans-container h4 {
                        color: #f5f5f5;
                        margin-bottom: 1rem;
                        font-size: 1.25rem;
                    }
                    .list-group-item {
                        background-color: transparent;
                        color: #ffffff;
                        border: none;
                        margin-bottom: 0.5rem;
                    }
                    .wallpapers-container h2 {
                        color: #f5f5f5;
                        margin-bottom: 1.5rem;
                    }
                    .wallpapers-container {
                        margin-top: 2rem;
                    }
                `}
            </style>

            <h1 style={{ fontSize: "2.5rem", textAlign: "center", marginBottom: "2rem", fontWeight: "bold" }}>
                Bienvenido, {store.artistaFeed?.username || "Artista"}
            </h1>

            <div className="fans-container">
                <h4 style={{ fontWeight: "bold", textAlign: "center" }}>Tus Seguidores</h4>
                {store.fansFollowing.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                        {store.fansFollowing.map((fan) => (
                            <div
                                key={fan.id}
                                style={{
                                    backgroundColor: "#1f1f2f",
                                    borderRadius: "10px",
                                    padding: "1rem",
                                    textAlign: "center",
                                    width: "150px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                <img
                                    src={fan.avatar}
                                    alt="Avatar"
                                    className="rounded mb-3"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "10px",
                                        objectFit: "cover",
                                        marginBottom: "0.5rem",
                                    }}
                                />
                                <p
                                    style={{
                                        color: "#ffffff",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        margin: 0,
                                    }}
                                >
                                    {fan.username}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ textAlign: "center" }}>Aún no tienes fans que te sigan.</p>
                )}
            </div>


            <div className="wallpapers-container">
                <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.8rem" }}>Tus Wallpapers</h2>

                <div className="d-flex mb-4" style={{ justifyContent: "center", gap: "20px" }}>
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
                    <div className="alert alert-success" role="alert" style={{ textAlign: "center" }}>
                        {successMessage}
                    </div>
                )}

                <div className="d-flex flex-wrap justify-content-center">
                    {wallpapers.length > 0 ? (
                        wallpapers.map((wallpaper) => {
                            const tags = store.TagsWallpapers.filter(
                                (relation) => relation.wallpaper.id === wallpaper.id
                            ).map((relation) => relation.tag.name);

                            return (
                                <div
                                    className={`card m-3 card-style ${selectedPaper === wallpaper.id ? "border-neon" : ""}`}
                                    style={{
                                        width: "18rem",
                                        cursor: "pointer",
                                        border: selectedPaper === wallpaper.id ? "2px solid #9b59b6" : "",
                                        boxShadow: selectedPaper === wallpaper.id ? "0 0 10px 2px #9b59b6" : "",
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
                        <div className="alert alert-danger" role="alert" style={{ textAlign: "center" }}>
                            No tienes wallpapers creados.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArtistaFeed;
