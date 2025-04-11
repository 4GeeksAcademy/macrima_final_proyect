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
        if (!store.authArtistaFeed) {
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

    if (!store.authArtistaFeed) return null;
    if (store.wallpapers === null) return <p>Cargando...</p>;

    const wallpapers = Array.isArray(store.wallpapers) ? store.wallpapers : [];

    return (
        <div className="dashboard-container">
            <h1>Bienvenido, {store.artistaFeed?.username || "Artista"}</h1>
            {/* <p>Email: {store.artistaFeed?.email || "No disponible"}</p> */}

            <div className="mt-4">
                <h4>Fans que te siguen</h4>
                {store.fansFollowing.length > 0 ? (
                    <ul className="list-group">
                        {store.fansFollowing.map((fan) => (
                            <li className="list-group-item" key={fan.id}>
                                {fan.username}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aún no tienes fans que te sigan.</p>
                )}
            </div>

            <div className="button-container mb-4">
                <LogoutFeedArtista />
                {/* <Link to="/editar-artista">
                    <button className="btn btn-warning">Editar Perfil</button>
                </Link>
                <Link to="/publicar-wallpaper">
                    <button className="btn btn-primary">Agregar Wallpaper</button>
                </Link> */}
            </div>

            <div className="wallpapers-container">
                <h2>Tus Wallpapers</h2>
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
                                    className={`card m-3 ${selectedPaper === wallpaper.id ? "border-primary" : ""}`}
                                    style={{
                                        width: "18rem",
                                    }}
                                    key={wallpaper.id}
                                    onClick={() => setSelectedPaper(wallpaper.id)}
                                >
                                    <img
                                        src={wallpaper.imagen || "https://via.placeholder.com/150"}
                                        className="card-img-top"
                                        alt={wallpaper.nombre || "Sin título"}
                                        style={{ width: "100%", height: "150px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{wallpaper.nombre || "Sin título"}</h5>
                                        <p className="card-text">Fecha: {wallpaper.fecha || "No disponible"}</p>
                                        <p className="card-text">
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
                <div className="d-flex mt-3">
                    <button
                        className="btn btn-warning me-2"
                        onClick={() => selectedPaper && navigate(`/agregar-tag-a-wallpaper/${selectedPaper}`)}
                        disabled={!selectedPaper}
                    >
                        Editar Wallpaper Seleccionado
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={handleDelete}
                        disabled={!selectedPaper}
                    >
                        Eliminar Wallpaper Seleccionado
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArtistaFeed;
