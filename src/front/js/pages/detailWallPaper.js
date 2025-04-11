import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import WallpaperComentarios from "../component/wallpaperComentario";

const DetailWallPaper = () => {
    const { store, actions } = useContext(Context);
    const { paperId } = useParams(); 
    const [wallpaper, setWallPaper] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false); // <- nuevo

    useEffect(() => {
        const fetchPaper = async () => {
            const paperData = await actions.getWallpaperById(paperId);
            setWallPaper(paperData);

            // Si tienes una acción que verifica si ya sigue al artista:
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

    if (!wallpaper) return <p>Cargando...</p>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body text-center">
                    <img src={wallpaper.imagen} alt="imagen" className="rounded-circle mb-3" width="150" />
                    <h2>{wallpaper.nombre}</h2>
                    <p><strong>Fecha:</strong> {wallpaper.fecha}</p>
                    <p><strong>artistaid:</strong> {wallpaper.artista_id}</p>

                    {/* Botón para seguir */}
                    {!isFollowing ? (
                        <button className="btn btn-primary mt-3" onClick={handleFollow}>
                            Seguir al artista
                        </button>
                    ) : (
                        <p className="mt-3 text-success">Ya sigues a este artista</p>
                    )}
                </div>
            </div>
            <WallpaperComentarios/>
        </div>
    );
};

export default DetailWallPaper;