import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const WallpaperList = () => {
    const { store, actions } = useContext(Context);
    const [selectedPaper, setSelectedPaper] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getWallpapers(); 
    }, []);

    const handleDelete = () => {
        if (selectedPaper) {
            actions.deleteWallpaper(selectedPaper);
            setSelectedPaper(null); 
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Wallpaper List</h2>

            
            <ul className="list-group">
                {store.wallPapers.map((wallpaper) => (
                    <li
                        key={wallpaper.id}
                        className={`list-group-item ${selectedPaper === wallpaper.id ? "active" : ""}`}
                        onClick={() => setSelectedPaper(wallpaper.id)}
                        style={{ cursor: "pointer" }}
                    >
                        {wallpaper.imagen || wallpaper.nombre || "Unknown wallPaper"}

                    </li>
                ))}
            </ul>

            
            <div className="mt-3 d-flex justify-content-evenly">
            <button className="btn btn-secondary" onClick={() => selectedPaper && navigate(`/wallpaper/detail/${selectedPaper}`)}
                disabled= {!selectedPaper}>
                    Detail Wallpaper
                </button>
            <button className="btn btn-primary" onClick={() => navigate("/wallpaper/new")}>
                    Create Wallpaper
                </button>
                <button className="btn btn-warning" onClick={() => selectedPaper && navigate(`/wallpaper/edit/${selectedPaper}`)}
                         disabled={!selectedPaper} >
                            Edit Wallpaper
                            </button>
                <button className="btn btn-danger" onClick={handleDelete} disabled={!selectedPaper}>
                    Delete Wallpaper
                </button>
            </div>
        </div>
    );
};

export default WallpaperList;

