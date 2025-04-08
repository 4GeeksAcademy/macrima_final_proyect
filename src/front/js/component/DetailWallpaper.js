import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const WallpaperDetail = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [wallpaper, setWallpaper] = useState(null);

    useEffect(() => {
        const fetchWallpaper = async () => {
            const token = localStorage.getItem("fanToken");
            const response = await fetch(`${process.env.BACKEND_URL}/api/wallpaper/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setWallpaper(data.wallpaper);
            } else {
                console.error("Error al obtener detalle del wallpaper");
            }
        };

        fetchWallpaper();
    }, [id]);

    if (!wallpaper) return <p>Cargando detalle...</p>;

   

    return (

        <>
        <div className="container mt-4">
        <button className="btn btn-primary mb-3" onClick={() => navigate("/fan/feed")}>
                ← Volver al feed
            </button>
        <div className="card">
            <div className="card-body text-center">
                <img src={wallpaper.imagen} alt="imagen" className="rounded-circle mb-3" width="150" />
                <h2>{wallpaper.nombre}</h2>
                <p><strong>Fecha:</strong> {wallpaper.fecha}</p>
                <p><strong>artistaid:</strong> {wallpaper.artista_id}</p>
            </div>
        </div>     
    </div>
            <button onClick={handleBack} className="btn btn-secondary w-100 mt-3">
                Volver al feed
            </button>
        </>
    );
};

export default WallpaperDetail;