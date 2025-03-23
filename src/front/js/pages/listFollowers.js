import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";



const ListFollowers = () => {


    const { store, actions } = useContext(Context);
    const [selectedLF, setSelectedLF] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        actions.getFollowers();
    }, []);
    const handleDelete = () => {
        if (selectedLF) {
            const selectedItem = store.followers.find(
                follower => follower.id === selectedLF
            );
            if (selectedItem) {
             actions.deleteFollower(selectedItem.fan.id, selectedItem.artista.id);

                setSelectedLF(null);
            }
        }
    };
    return (
        <div className="container mt-4">
            <h2 className="text-center">Followers List</h2>
            <ul className="list-group">
                {store.followers.map((followers) => (
                    <li
                        key={followers.id}
                        className={`list-group-item ${selectedLF === followers.id ? "active" : ""}`}
                        onClick={() => setSelectedLF(followers.id)}
                        style={{ cursor: "pointer" }}
                    >

                        {followers.fan?.username && followers.artista?.username
                            ? `${followers.fan.username} - ${followers.artista.username}`
                            : "Unnamed follower"}
                    </li>
                ))}
            </ul>
            <div className="mt-3 d-flex justify-content-evenly">
                <button className="btn btn-primary" onClick={() => navigate("/follower/new")}>
                    Follow
                </button>
               
                <button className="btn btn-danger" onClick={handleDelete} disabled={!selectedLF}>
                    Unfollow
                </button> 
            </div>
        </div>
    );
};
export default ListFollowers;