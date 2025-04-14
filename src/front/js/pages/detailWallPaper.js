import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import WallpaperComentarios from "../component/wallpaperComentario";

const DetailWallPaper = () => {
    const { store, actions } = useContext(Context);
    const { paperId } = useParams();
    const [wallpaper, setWallPaper] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const fetchPaper = async () => {
            const paperData = await actions.getWallpaperById(paperId);
            setWallPaper(paperData);

            const following = await actions.checkIfFollowingArtist(paperData.artista_id);
            setIsFollowing(following);
        };
        fetchPaper();
    }, [paperId]);

    const handleFollow = async () => {
        const success = await actions.followArtist(wallpaper.artista_id);
        if (success) {
            setIsFollowing(true);
        }
    };

    if (!wallpaper) return <p className="text-center text-white">Cargando...</p>;

    return (
        <div
            className="detail-container d-flex flex-column align-items-center"
            style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#e0e0e0", padding: "2rem" }}
        >
            <div
                className="wallpaper-card p-4 text-center"
                style={{
                    backgroundColor: "#1e1e1e",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                    width: "100%",
                    maxWidth: "800px", // Aumentado el ancho máximo para el fondo
                }}
            >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                    <img
                        src={wallpaper.imagen}
                        alt={wallpaper.nombre}
                        style={{
                            borderRadius: "15px", // Borde más redondeado
                            width: "100%",
                            maxWidth: "500px", // Incrementado el tamaño máximo para que se vea más grande
                            objectFit: "cover",
                        }}
                    />
                </div>
                <h2 style={{ color: "#ffffff", marginBottom: "0.5rem" }}>{wallpaper.nombre}</h2>
                <p style={{ color: "#b0b0b0", marginBottom: "1rem" }}>
                    <strong>Fecha:</strong> {wallpaper.fecha}
                </p>

                {!isFollowing ? (
                    <button
                        className="btn btn-primary"
                        onClick={handleFollow}
                        style={{
                            backgroundColor: "#6a11cb",
                            border: "none",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "25px",
                            fontWeight: "bold",
                            color: "#ffffff",
                        }}
                    >
                        Seguir al artista
                    </button>
                ) : (
                    <p
                        className="mt-3"
                        style={{
                            color: "#6a11cb",
                            fontWeight: "bold",
                        }}
                    >
                        Ya sigues a este artista
                    </p>
                )}
            </div>
            <div className="comments-section mt-5" style={{ width: "100%", maxWidth: "800px" }}>
                <WallpaperComentarios />
            </div>
        </div>
    );
};

export default DetailWallPaper;
