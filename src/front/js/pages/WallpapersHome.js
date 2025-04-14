import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const WallpapersHome = () => {
    const navigate = useNavigate();
    const { store } = useContext(Context);

    const [allWallpapers, setAllWallpapers] = useState([]);
    const [favoriteWallpapers, setFavoriteWallpapers] = useState([]);
    const [followedArtists, setFollowedArtists] = useState([]);

    useEffect(() => {
        if (!store.authFan) navigate("/login_fan");
    }, [store.authFan]);

    useEffect(() => {
        getFavoriteWallpapers();
        getFollowedArtists();
    }, []);

    useEffect(() => {
        if (favoriteWallpapers.length >= 0) {
            getAllWallpapers();
        }
    }, [favoriteWallpapers]);

    const getFavoriteWallpapers = async () => {
        try {
            const token = localStorage.getItem("fanToken");
            if (!token) throw new Error("No hay token almacenado");

            const response = await fetch(`${process.env.BACKEND_URL}/api/fan/favorites`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setFavoriteWallpapers(data);
            } else {
                console.error("Error al obtener los wallpapers favoritos");
                setFavoriteWallpapers([]);
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            setFavoriteWallpapers([]);
        }
    };

    const getFollowedArtists = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/fan/following_artists`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("fanToken")}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setFollowedArtists(data);
            }
        } catch (error) {
            console.error("Error al obtener artistas seguidos:", error);
        }
    };

    const getAllWallpapers = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/wallpapers`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("fanToken")}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                const filteredWallpapers = data.filter(wp => !favoriteWallpapers.some(fav => fav.id === wp.id));
                setAllWallpapers(filteredWallpapers);
            } else {
                console.error("Error al obtener todos los wallpapers");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    const handleUpdate = () => navigate("/perfil");

    const handleLogout = () => {
        localStorage.removeItem("fanToken");
        localStorage.removeItem("fanData");
        navigate("/registro_fan");
        window.location.reload();
    };

    const addFavoriteWallpaper = async (wallpaperId) => {
        try {
            const token = localStorage.getItem("fanToken");
            if (!token) throw new Error("No hay token almacenado");

            const response = await fetch(`${process.env.BACKEND_URL}/api/add_favorite_wallpaper`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id_wallpaper: wallpaperId }),
            });

            if (response.ok) {
                const wallpaperToAdd = allWallpapers.find((wp) => wp.id === wallpaperId);
                if (wallpaperToAdd) {
                    setFavoriteWallpapers((prev) => [...prev, wallpaperToAdd]);
                    setAllWallpapers((prev) => prev.filter((wp) => wp.id !== wallpaperId));
                }
            } else {
                console.error("Error al agregar a favoritos");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    const removeFavoriteWallpaper = async (wallpaperId) => {
        try {
            const token = localStorage.getItem("fanToken");
            if (!token) throw new Error("No hay token almacenado");

            const response = await fetch(`${process.env.BACKEND_URL}/api/remove_favorite_wallpaper`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id_wallpaper: wallpaperId }),
            });

            if (response.ok) {
                const wallpaperToRestore = favoriteWallpapers.find((wp) => wp.id === wallpaperId);
                if (wallpaperToRestore) {
                    setAllWallpapers((prev) => [...prev, wallpaperToRestore]);
                    setFavoriteWallpapers((prev) => prev.filter((wp) => wp.id !== wallpaperId));
                }
            } else {
                console.error("Error al eliminar de favoritos");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="mb-3 d-flex gap-3">
                <button className="btn btn-warning" onClick={handleUpdate}>
                    Editar perfil
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>

            <div className="col-md-4 mb-4">
                <h4>Artistas Seguidos</h4>
                <ul className="list-group list-group-flush">
                    {followedArtists.length > 0 ? (
                        followedArtists.map((artista) => (
                            <li key={artista.id} className="list-group-item">
                                {artista.username}
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item">Aún no sigues a ningún artista.</li>
                    )}
                </ul>
            </div>

            <h2 className="text-center">Feed del Fan</h2>

            <h3>Favoritos</h3>
            <div className="row">
                {favoriteWallpapers.map((wallpaper) => (
                    <div className="col-12 col-md-6 col-lg-3" key={wallpaper.id}>
                        <div className="card m-3" style={{ width: "18rem" }}>
                            <img
                                src={wallpaper.imagen || "https://via.placeholder.com/150"}
                                className="card-img-top"
                                alt={wallpaper.nombre || "Sin título"}
                                style={{ height: "150px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{wallpaper.nombre || "Sin título"}</h5>
                                <p className="card-text">Fecha: {wallpaper.fecha || "No disponible"}</p>
                                <div className="d-flex justify-content-center">
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeFavoriteWallpaper(wallpaper.id)}
                                    >
                                        X
                                    </button>
                                    <button
                                        className="btn btn-secondary ms-3"
                                        onClick={() => navigate(`/wallpaper/detail/${wallpaper.id}`)}
                                    >
                                        <i className="fa-solid fa-circle-info"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h3 className="mt-4">Wallpapers Disponibles</h3>
            <div className="row">
                {allWallpapers.map((wallpaper) => (
                    <div className="col-12 col-md-6 col-lg-3" key={wallpaper.id}>
                        <div className="card m-3" style={{ width: "18rem" }}>
                            <img
                                src={wallpaper.imagen || "https://via.placeholder.com/150"}
                                className="card-img-top"
                                alt={wallpaper.nombre || "Sin título"}
                                style={{ height: "150px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{wallpaper.nombre || "Sin título"}</h5>
                                <p className="card-text">Fecha: {wallpaper.fecha || "No disponible"}</p>
                                <div className="d-flex justify-content-center">
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => addFavoriteWallpaper(wallpaper.id)}
                                    >
                                        <i className="fa-solid fa-heart"></i>
                                    </button>
                                    <button
                                        className="btn btn-secondary ms-3"
                                        onClick={() => navigate(`/wallpaper/detail/${wallpaper.id}`)}
                                    >
                                        <i className="fa-solid fa-circle-info"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WallpapersHome;






