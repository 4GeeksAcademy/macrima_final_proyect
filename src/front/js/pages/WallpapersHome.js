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
        if (store.authFan==false) navigate("/login_fan");
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
        <div className="mt-4" style={{ backgroundColor: "#1e1e2f", color: "#f5f5f5", padding: "2rem", borderRadius: "10px" }}>

            <button
                type="submit"
                className="btn btn-danger"
                onClick={() => handleLogout()}
                style={{
                    backgroundColor: "#ef5350",
                    color: "#ffffff",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginBottom: "2rem",
                }}
            >
                Cerrar Sesión
            </button>
            <div
    className="col-md-4"
    style={{
        margin: "0 auto", 
        textAlign: "center", 
    }}
>
            <h1 style={{ fontSize: "32px", textAlign: "center", marginBottom: "2rem" }}>
                Bienvenido, {store.fanFeedData?.username || "Artista"}
            </h1>
    <h4 style={{ fontWeight: "bold", marginBottom: "1rem" }}>Artistas Seguidos</h4>
    <ul style={{ display: "inline-block", textAlign: "left" }}>
        {followedArtists.length > 0 ? (
            followedArtists.map((artista) => (
                <li
                    key={artista.id}
                   
                >
                    {artista.username}
                </li>
            ))
        ) : (
            <li
                style={{
                    backgroundColor: "#252540",
                    color: "#f5f5f5",
                    padding: "0.5rem",
                    borderRadius: "5px",
                }}
            >
                Aún no sigues a ningún artista.
            </li>
        )}
    </ul>
</div>



            <h2 className="text-center">Feed</h2>


            <h3 style={{ marginTop: "2rem", fontWeight: "bold" }}>Favoritos</h3>
            <div className="row w-100" style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                {favoriteWallpapers && favoriteWallpapers.length > 0 && favoriteWallpapers.map((wallpaper) => (
                    <div className="col-12 col-md-6 col-lg-3">
                        <div
                            className={`card m-3`}
                            style={{
                                width: "18rem",
                                backgroundColor: "#252540",
                                color: "#f5f5f5",
                                borderRadius: "10px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                overflow: "hidden",
                            }}
                            key={wallpaper.id}
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
                            <div className="card-body" style={{ padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h5 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "0.5rem", textAlign: "center" }}>{wallpaper.nombre || "Sin título"}</h5>
                                <p style={{ fontSize: "14px", marginBottom: "1rem", textAlign: "center" }}>Fecha: {wallpaper.fecha || "No disponible"}</p>
                                <div className="d-flex justify-content-center w-100" style={{ gap: "10px" }}>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeFavoriteWallpaper(wallpaper.id)}
                                        style={{
                                            backgroundColor: "#ef5350",
                                            color: "#ffffff",
                                            border: "none",
                                            padding: "0.5rem 1rem",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        X
                                    </button>
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => navigate(`/wallpaper/detail/${wallpaper.id}`)}
                                        style={{
                                            backgroundColor: "#607d8b",
                                            color: "#ffffff",
                                            border: "none",
                                            padding: "0.5rem 1rem",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <i className="fa-solid fa-circle-info"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <h3 className="mt-4" style={{ marginTop: "2rem", fontWeight: "bold" }}>Wallpapers Disponibles</h3>
            <div className="row w-100" style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                {allWallpapers && allWallpapers.length > 0 && allWallpapers.map((wallpaper) => (
                    <div className="col-12 col-md-6 col-lg-2">
                        <div
                            className={`card m-3`}
                            style={{
                                width: "18rem",
                                backgroundColor: "#252540",
                                color: "#f5f5f5",
                                borderRadius: "10px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                overflow: "hidden",
                            }}
                            key={wallpaper.id}
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
                            <div className="card-body" style={{ padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <h5 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "0.5rem", textAlign: "center" }}>{wallpaper.nombre || "Sin título"}</h5>
                                <p style={{ fontSize: "14px", marginBottom: "1rem", textAlign: "center" }}>Fecha: {wallpaper.fecha || "No disponible"}</p>
                                <div className="d-flex justify-content-center w-100" style={{ gap: "10px" }}>
                                    <button
                                        className="btn btn-sm"
                                        onClick={() => addFavoriteWallpaper(wallpaper.id)}
                                        style={{
                                            backgroundColor: "#6a0dad", 
                                            color: "#ffffff",
                                            border: "none",
                                            padding: "0.5rem 1rem",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <i className="fa-solid fa-heart"></i>
                                    </button>

                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => navigate(`/wallpaper/detail/${wallpaper.id}`)}
                                        style={{
                                            backgroundColor: "#607d8b",
                                            color: "#ffffff",
                                            border: "none",
                                            padding: "0.5rem 1rem",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
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
    )
        ;
};
export default WallpapersHome;