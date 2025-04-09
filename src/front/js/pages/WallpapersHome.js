import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const WallpapersHome = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const [fanData, setFanData] = useState() 
    const [allWallpapers, setAllWallpapers] = useState([]);
    const [favoriteWallpapers, setFavoriteWallpapers] = useState([]);

    const handleUpdate = () => {
        navigate(`/perfil`); 
    };

    const handleLogout = () => {
        localStorage.removeItem("fanToken");
        navigate("/registro_fan"); 
        window.location.reload();
    };

    const handleDetail = () => {
        navigate(`/detail_wallpaper`); 
    };

   
    const getAllWallpapers = async () => {
        try {
            const token = localStorage.getItem("fanToken");
            if (!token) throw new Error("No hay token almacenado");

            const response = await fetch(`${process.env.BACKEND_URL}/api/all_wallpapers_favorites`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                setAllWallpapers(data.wallpapers);  
            } else {
                console.error("Error al obtener los wallpapers");
                setAllWallpapers([]);  
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            setAllWallpapers([]);  
        }
    };

    const getFavoriteWallpapers = async () => {
        try {
            const token = localStorage.getItem("fanToken");
            if (!token) throw new Error("No hay token almacenado");
    
            const response = await fetch(`${process.env.BACKEND_URL}/api/favorite_wallpapers`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
    
            if (response.status === 200) {
                const data = await response.json();
                setFavoriteWallpapers(data.favorite_wallpapers);
            } else {
                console.error("Error al obtener los wallpapers favoritos");
                setFavoriteWallpapers([]);  
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            setFavoriteWallpapers([]);
        }
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

        if (response.status === 200) {
            console.log(`Wallpaper ${wallpaperId} agregado a favoritos`);

            setAllWallpapers(prevWallpapers => prevWallpapers.filter(wallpaper => wallpaper.id !== wallpaperId));

            setFavoriteWallpapers(prevFavorites => {
                const wallpaperToAdd = allWallpapers.find(wallpaper => wallpaper.id === wallpaperId);
                return wallpaperToAdd && !prevFavorites.some(wallpaper => wallpaper.id === wallpaperId)
                    ? [...prevFavorites, wallpaperToAdd]
                    : prevFavorites;
            });
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

        if (response.status === 200) {
            console.log(`Wallpaper ${wallpaperId} eliminado de favoritos`);

            setFavoriteWallpapers(prevFavorites => prevFavorites.filter(wallpaper => wallpaper.id !== wallpaperId));

            setAllWallpapers(prevWallpapers => {
                const wallpaperToRemove = favoriteWallpapers.find(wallpaper => wallpaper.id === wallpaperId);
                return wallpaperToRemove && !prevWallpapers.some(wallpaper => wallpaper.id === wallpaperId)
                    ? [...prevWallpapers, wallpaperToRemove]
                    : prevWallpapers;
            });
        } else {
            console.error("Error al eliminar de favoritos");
        }
    } catch (error) {
        console.error("Error de conexión:", error);
    }
};

    useEffect(() => {
        getAllWallpapers();
        getFavoriteWallpapers();
    }, []);




    return (
        <div className="container mt-4">
         <button type="submit" className="btn btn-warning"  onClick={handleUpdate}>
            Editar perfil
        </button>
        <button type="submit" className="btn btn-danger" onClick={() => handleLogout()}>
            Cerrar Sesion
        </button>
            <h2 className="text-center">Feed del Fan</h2>

            
            <h3>Favoritos</h3>
            <ul className="list-group">
                {favoriteWallpapers.map((wallpaper) => (
                    <li key={wallpaper.id} className="list-group-item">
                        {wallpaper.nombre}
                        <button
                            className="btn btn-danger btn-sm float-right"
                            onClick={() => removeFavoriteWallpaper(wallpaper.id)}
                        >
                            Eliminar de Favorito (ID: {wallpaper.id})
                        </button>
                    </li>
                ))}
            </ul>

            <h3 className="mt-4">Wallpapers Disponibles</h3>
            <ul className="list-group">
                {allWallpapers.map((wallpaper) => (
                    <li key={wallpaper.id} className="list-group-item">
                        {wallpaper.nombre}
                        <button
                            className="btn btn-success btn-sm float-right"
                            onClick={() => addFavoriteWallpaper(wallpaper.id)}
                        >
                            Agregar a Favorito (ID: {wallpaper.id})
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate(`/wallpaper/detail/${wallpaper.id}`)}>
                             Detail Wallpaper
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WallpapersHome;


