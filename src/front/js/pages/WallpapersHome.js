import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const WallpapersHome = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const [fanData, setFanData] = useState() 
    const [allWallpapers, setAllWallpapers] = useState([]);
    const [favoriteWallpapers, setFavoriteWallpapers] = useState([]);
    const [followedArtists, setFollowedArtists] = useState([]);

    const handleUpdate = () => {
        navigate(`/perfil`); 
    };

    const handleLogout = () => {
        localStorage.removeItem("fanToken");
        localStorage.removeItem("fanData");
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

            const response = await fetch(`${process.env.BACKEND_URL}/api/wallpapers/located`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                setAllWallpapers(data); 
                return true  
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
        // try {
            const token = localStorage.getItem("fanToken");
            if (!token) throw new Error("No hay token almacenado");
    
            const response = await fetch(`${process.env.BACKEND_URL}/api/fan/favorites`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
    
            if (response.status === 200) {
                const data = await response.json();
                setFavoriteWallpapers(data);
                return true 
                console.log(data)
            } else {
                console.error("Error al obtener los wallpapers favoritos");
                setFavoriteWallpapers([]);  
            }
        // } catch (error) {
        //     console.error("Error de conexión:", error);
        //     setFavoriteWallpapers([]);
        // }
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


const getFollowedArtists = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/fan/following_artists", {
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


  useEffect( () => {
    if (store.authFan == false) {navigate("/login_fan")}
  }, [store.authFan])

//   if (!store.authFan) return null


    useEffect(() => {
        // const getData = async () => {
        //     const result = await getAllWallpapers();
        //     if (result == true) {
                getFavoriteWallpapers();
                getFollowedArtists();
                getAllWallpapers()
                
    //         }          
    //     }
    //    getData() 
     }, []);

    useEffect(() => {
        if (store.wallPapers){
            if (store.wallPapers.length > 0){
                const newAllWallpapers = store.wallPapers.filter(item => !favoriteWallpapers.some(element => item.id == element.id))
        setAllWallpapers(newAllWallpapers)

            }
        }
        
    }, [favoriteWallpapers, store.wallPapers]);


    return (
        <div className="container mt-4">
         <button type="submit" className="btn btn-warning"  onClick={handleUpdate}>
            Editar perfil
        </button>
        <button type="submit" className="btn btn-danger" onClick={() => handleLogout()}>
            Cerrar Sesion
        </button>


        <div className="col-md-4">
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
            <div className="row w-100">
                {favoriteWallpapers && favoriteWallpapers.length > 0 && favoriteWallpapers.map((wallpaper) => (
                     <div className="col-12 col-md-6 col-lg-3">
                     <div
                     className={`card m-3`}
                     style={{
                         width: "18rem",
                     }}
                     key={wallpaper.id}
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
                         {/* <p className="card-text">
                             Categorías: {tags.length > 0 ? tags.join(", ") : "Sin tags"}
                         </p> */}
                         <div className="d-flex justify-content-center w-100">
                         <button
                            className="btn btn-danger btn-sm float-right"
                            onClick={() => removeFavoriteWallpaper(wallpaper.id)}
                        >
                            X
                        </button>
                         <button className="btn btn-secondary ms-3" onClick={() => navigate(`/wallpaper/detail/${wallpaper.id}`)}>
                         <i className="fa-solid fa-circle-info"></i>
                         </button> </div>
                     </div>
                 </div>
                 </div>
                    // <li key={wallpaper.id} className="list-group-item">
                    //     {wallpaper.nombre}
                    //     <button
                    //         className="btn btn-danger btn-sm float-right"
                    //         onClick={() => removeFavoriteWallpaper(wallpaper.id)}
                    //     >
                    //         Eliminar de Favorito (ID: {wallpaper.id})
                    //     </button>
                    // </li>
                ))}
            </div>

            <h3 className="mt-4">Wallpapers Disponibles</h3>
            <div className="row w-100">
                {allWallpapers && allWallpapers.length > 0 && allWallpapers.map((wallpaper) => (
                    <div className="col-12 col-md-6 col-lg-3">
                    <div
                    className={`card m-3`}
                    style={{
                        width: "18rem",
                    }}
                    key={wallpaper.id}
                >
                    <img
                        src={wallpaper.imagen || "https://via.placeholder.com/150"}
                        className="card-img-top"
                        alt={wallpaper.nombre || "Sin título"}
                        style={{ width: "100%", height: "150px", objectFit: "cover" }}
                    />
                    <div className="card-body w-100">
                        <h5 className="card-title">{wallpaper.nombre || "Sin título"}</h5>
                        <p className="card-text">Fecha: {wallpaper.fecha || "No disponible"}</p>
                        {/* <p className="card-text">
                            Categorías: {tags.length > 0 ? tags.join(", ") : "Sin tags"}
                        </p> */}
                        <div className="d-flex justify-content-center w-100"> 
                            <button
                            className="btn btn-success btn-sm float-right"
                            onClick={() => addFavoriteWallpaper(wallpaper.id)}
                        >
                            <i className="fa-solid fa-heart"></i>
                        </button>
                        <button className="btn btn-secondary ms-3" onClick={() => navigate(`/wallpaper/detail/${wallpaper.id}`)}>
                        <i className="fa-solid fa-circle-info"></i>
                        </button> </div>
                    </div>
                </div>
                </div>
                    // <li key={wallpaper.id} className="list-group-item">
                    //     {wallpaper.nombre}
                    //     <button
                    //         className="btn btn-success btn-sm float-right"
                    //         onClick={() => addFavoriteWallpaper(wallpaper.id)}
                    //     >
                    //         Agregar a Favorito (ID: {wallpaper.id})
                    //     </button>
                    //     <button className="btn btn-secondary" onClick={() => navigate(`/wallpaper/detail/${wallpaper.id}`)}>
                    //          Detail Wallpaper
                    //     </button>
                    // </li>
                ))}
            </div>
        </div>
    );
};

export default WallpapersHome;


