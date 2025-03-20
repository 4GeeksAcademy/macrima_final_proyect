import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const FanList = () => {
    const { store, actions } = useContext(Context);
    const [selectedFan, setSelectedFan] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getFans(); 
    }, []);

    const handleDelete = () => {
        if (selectedFan) {
            actions.deleteFan(selectedFan);
            setSelectedFan(null); 
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Fan List</h2>

            
            <ul className="list-group">
                {store.fans.map((fan) => (
                    <li
                        key={fan.id}
                        className={`list-group-item ${selectedFan === fan.id ? "active" : ""}`}
                        onClick={() => setSelectedFan(fan.id)}
                        style={{ cursor: "pointer" }}
                    >
                        {fan.username || fan.email || "Unnamed Fan"}

                    </li>
                ))}
            </ul>

            
            <div className="mt-3 d-flex justify-content-evenly">
            <button className="btn btn-secondary" onClick={() => selectedFan && navigate(`/detailFan/${selectedFan}`)}
                disabled= {!selectedFan}>
                    Detail Fan
                </button>
            <button className="btn btn-primary" onClick={() => navigate("/addFan")}>
                    Create Fan
                </button>
                <button className="btn btn-warning" onClick={() => selectedFan && navigate(`/updateFan/${selectedFan}`)}
                         disabled={!selectedFan} >
                            Edit Fan
                            </button>
                <button className="btn btn-danger" onClick={handleDelete} disabled={!selectedFan}>
                    Delete Fan
                </button>
            </div>
        </div>
    );
};

export default FanList;

