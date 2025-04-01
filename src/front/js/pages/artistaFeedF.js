import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import LogoutFeedArtista from "../component/logoutArtistaFeed";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ArtistaFeed = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (!store.authArtistaFeed) {
            navigate("/loginF-artista"); // Redirige si el usuario no está autenticado
        } else {
            actions.getWallpapersByUser(); // Llama a la acción para obtener wallpapers
        }
    }, [store.authArtistaFeed]);

    // Manejo de valores nulos o indefinidos para evitar errores
    if (!store.authArtistaFeed) return null; // Si no hay autenticación, no renderiza nada
    if (store.wallpapers === null) return <p>Cargando...</p>; // Mientras los datos se cargan del backend

    const wallpapers = Array.isArray(store.wallpapers) ? store.wallpapers : []; // Garantizar que sea un array

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
                            <div className="card m-3" style={{ width: "18rem" }} key={wallpaper.id}>
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
                            No tienes wallpaper creados.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArtistaFeed;
