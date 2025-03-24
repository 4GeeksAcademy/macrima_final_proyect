import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const FavoritosList = () => {
    const { store, actions } = useContext(Context);
    const [selectedFav, setSelectedFav] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getFavoritos();
    }, []);
 
    const handleDelete = () => {
        if (selectedFav) {
            const selectedItem = store.favoritos.find(
                wallpaper => wallpaper.id === selectedFav
            );
            if (selectedItem) {
                actions.deleteFavorito(selectedItem.fan.id, selectedItem.wallpaper.id);
                setSelectedFav(null);
            }
        }
    };
    
    return (
        <div className="container mt-4">
            <h2 className="text-center">Favoritos List</h2>
            <ul className="list-group">
                {store.favoritos.map((favorito) => (
                    <li
                        key={favorito.id}
                        className={`list-group-item ${selectedFav === favorito.id ? "active" : ""}`}
                        onClick={() => setSelectedFav(favorito.id)}
                        style={{ cursor: "pointer" }}
                    >
                        {/* {favorito.fan.name && favorito.wallpaper.id || "Unnamed TagWallpaper"} */}
                        {favorito.fan?.username && favorito.wallpaper?.id
                            ? `${favorito.fan.username} - ${favorito.wallpaper.id}`
                            : "Unnamed TagWallpaper"}
                    </li>
                ))}
            </ul>

            <div className="mt-3 d-flex justify-content-evenly">
                <button className="btn btn-primary" onClick={() => navigate("/favorito/new")}>
                    New Favorito
                </button>
                <button className="btn btn-warning" onClick={() => selectedFav && navigate(`/favoritos/edit/${selectedFav}`)}
                    disabled={!selectedFav} >
                    Edit Favorito
                </button>
                <button className="btn btn-danger" onClick={handleDelete} disabled={!selectedFav}>
                    Delete Favorito
                </button>
            </div>
        </div>
    );
};

export default FavoritosList;