import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const MeGustaList = () => {
    const { store, actions } = useContext(Context);
    const [selectedMeGusta, setSelectedMeGusta] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getMeGusta(); 
    }, []);

    const handleDelete = async () => {
        if (selectedMeGusta) {
            const selectedItem = store.me_gusta.find(
                me_gusta => me_gusta.id === selectedMeGusta
            );
            if (selectedItem) {
                await actions.deleteMeGusta(selectedItem.fan.id, selectedItem.wallpaper.id);
                setSelectedMeGusta(null);
                await actions.getMeGusta(); 
            }
        }
    };
    

    return (
        <div className="container mt-4">
            <h2 className="text-center">Me Gusta List</h2>
            <ul className="list-group">
                {store.me_gusta.map((me_gusta) => (
                    <li
                        key={me_gusta.id}
                        className={`list-group-item ${selectedMeGusta === me_gusta.id ? "active" : ""}`}
                        onClick={() => setSelectedMeGusta(me_gusta.id)}
                        style={{ cursor: "pointer" }}
                    >
                        {me_gusta.fan?.username && me_gusta.wallpaper?.id
                            ? `${me_gusta.fan.username} - ${me_gusta.wallpaper.id}`
                            : "Unnamed TagWallpaper"}
                    </li>
                ))}
            </ul>

            <div className="mt-3 d-flex justify-content-evenly">
                <button className="btn btn-primary" onClick={() => navigate("/me_gusta/new")}>
                    New Me Gusta
                </button>
                <button
                    className="btn btn-warning"
                    onClick={() => selectedMeGusta && navigate(`/me_gusta/edit/${selectedMeGusta}`)}
                    disabled={!selectedMeGusta}
                >
                    Edit Me Gusta
                </button>
                <button className="btn btn-danger" onClick={handleDelete} disabled={!selectedMeGusta}>
                    Delete Me Gusta
                </button>
            </div>
        </div>
    );
};

export default MeGustaList;
