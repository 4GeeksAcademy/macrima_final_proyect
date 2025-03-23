import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const DetailWallPaper = () => {
    const { store, actions } = useContext(Context);
    const { paperId } = useParams(); 
    const [wallpaper, setWallPaper] = useState(null);

    useEffect(() => {
        const fetchPaper = async () => {
            const paperData = await actions.getWallpaperById(paperId);
            setWallPaper(paperData);
        };
        fetchPaper();
    }, [paperId]);

    if (!wallpaper) return <p>Cargando...</p>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body text-center">
                    <img src={wallpaper.imagen} alt="imagen" className="rounded-circle mb-3" width="150" />
                    <h2>{wallpaper.nombre}</h2>
                    <p><strong>Fecha:</strong> {wallpaper.fecha}</p>
                    <p><strong>artistaid:</strong> {wallpaper.artista_id}</p>
                </div>
            </div>
        </div>
    );
};

export default DetailWallPaper;