import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const ComentsWallpaperList = () => {
    const { store, actions } = useContext(Context);
    const [selectedComent, setSelectedComent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getComentsWallpapers();
    }, []);
 
    const handleDelete = () => {
        if (selectedComent) {
            const selectedItem = store.coments.find(c => c.id === selectedComent);
            
            console.log("Selected comment to delete:", selectedItem); 
            
            if (selectedItem) {
                actions.deleteComentWallpaper(selectedItem.fan.id, selectedItem.wallpaper.id);
                setSelectedComent(null);
            } else {
                console.error("Error: selectedItem not found in store.coments");
            }
        }
    };
    
    
    return (
        <div className="container mt-4">
            <h2 className="text-center">Coments List</h2>
            <ul className="list-group">
                {store.coments.map((Coments) => (
                    <li
                        key={Coments.id}
                        className={`list-group-item ${selectedComent === Coments.id ? "active" : ""}`}
                        onClick={() => setSelectedComent(Coments.id)}
                        style={{ cursor: "pointer" }}
                    >
                        {/* {Coments.fan.name && Coments.wallpaper.id || "Unnamed Coments"} */}
                        {Coments.fan?.username && Coments.wallpaper?.nombre
                            ? `${Coments.fan.username} - ${Coments.wallpaper.nombre}`
                            : "Unnamed Coment"}
                    </li>
                ))}
            </ul>

            <div className="mt-3 d-flex justify-content-evenly">
                <button className="btn btn-primary" onClick={() => navigate("/CreateComent")}>
                    Create Coment
                </button>
                <button className="btn btn-warning" onClick={() => selectedComent && navigate(`/updatecoment/${selectedComent}`)}
                    disabled={!selectedComent} >
                    Edit Coment
                </button>
                <button className="btn btn-danger" onClick={handleDelete} disabled={!selectedComent}>
                    Delete Coment
                </button>
            </div>
        </div>
    );
};

export default ComentsWallpaperList;
