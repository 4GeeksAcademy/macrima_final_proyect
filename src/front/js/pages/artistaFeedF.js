import React, { useContext, useEffect, useState } from "react";
import LogoutFeedArtista from "../component/logoutArtistaFeed";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const ArtistaFeed = () => {
    const navigate = useNavigate();
    const [selectedPaper, setSelectedPaper] = useState(null);
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (!store.authArtistaFeed) {
            navigate("/loginF-artista");
        } else {
            actions.getWallpapersByUser();
        }
    }, [store.authArtistaFeed]);

    if (!store.authArtistaFeed) return null;
    if (store.wallpapers === null) return <p>Cargando...</p>;

    const wallpapers = Array.isArray(store.wallpapers) ? store.wallpapers : [];

    return (
        <div className="dashboard-container">
            <h1>Bienvenido, {store.artistaFeed?.username || "Artista"}</h1>
            <p>Email: {store.artistaFeed?.email || "No disponible"}</p>

            <div className="button-container mb-4">
                <LogoutFeedArtista />
                <Link to="/editar-artista">
                    <button className="btn btn-warning">Editar Perfil</button>
                </Link>
                <Link to="/publicar-wallpaper">
                    <button className="btn btn-primary">Agregar Wallpaper</button>
                </Link>
            </div>

            <div className="wallpapers-container">
                <h2>Tus Wallpapers</h2>
                <div className="d-flex flex-wrap justify-content-start">
                    {wallpapers.length > 0 ? (
                        wallpapers.map((wallpaper) => (
                            <div
                                className={`card m-3 ${selectedPaper === wallpaper.id ? "border-primary" : ""}`}
                                style={{
                                    width: "18rem",
                                    cursor: "pointer",
                                    boxShadow: selectedPaper === wallpaper.id ? "0 0 10px #007bff" : "none",
                                }}
                                key={wallpaper.id}
                                onClick={() => setSelectedPaper(wallpaper.id)}
                            >
                                <img
                                    src={wallpaper.imagen || "https://via.placeholder.com/150"}
                                    className="card-img-top"
                                    alt={wallpaper.nombre || "Sin título"}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{wallpaper.nombre || "Sin título"}</h5>
                                    <p className="card-text">Fecha: {wallpaper.fecha || "No disponible"}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="alert alert-danger" role="alert">
                            No tienes wallpapers creados.
                        </div>
                    )}
                </div>
                <button
                    className="btn btn-secondary mt-3"
                    onClick={() => selectedPaper && navigate(`/agregar-tag-a-wallpaper/${selectedPaper}`)}
                    disabled={!selectedPaper}
                >
                    Agregar Tag al Wallpaper
                </button>
            </div>
        </div>
    );
};

export default ArtistaFeed;
