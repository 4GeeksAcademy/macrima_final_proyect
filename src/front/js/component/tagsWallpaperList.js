import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const TagsWallpaperList = () => {
    const { store, actions } = useContext(Context);
    const [selectedTW, setSelectedTW] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getTagsWallpapers();
    }, []);
 
    const handleDelete = () => {
        if (selectedTW) {
            const selectedItem = store.TagsWallpapers.find(
                wallpaper => wallpaper.id === selectedTW
            );
            if (selectedItem) {
                actions.deleteTagWallpaper(selectedItem.tag.id, selectedItem.wallpaper.id);
                setSelectedTW(null);
            }
        }
    };
    
    return (
        <div className="container mt-4">
            <h2 className="text-center">TagsWallpaper List</h2>
            <ul className="list-group">
                {store.TagsWallpapers.map((TagsWallpapers) => (
                    <li
                        key={TagsWallpapers.id}
                        className={`list-group-item ${selectedTW === TagsWallpapers.id ? "active" : ""}`}
                        onClick={() => setSelectedTW(TagsWallpapers.id)}
                        style={{ cursor: "pointer" }}
                    >
                        {TagsWallpapers.tag.name && TagsWallpapers.wallpaper.id || "Unnamed TagWallpaper"}
                        {TagsWallpapers.tag?.name && TagsWallpapers.wallpaper?.id
                            ? `${TagsWallpapers.tag.name} - ${TagsWallpapers.wallpaper.id}`
                            : "Unnamed TagWallpaper"}
                    </li>
                ))}
            </ul>

            <div className="mt-3 d-flex justify-content-evenly">
                <button className="btn btn-primary" onClick={() => navigate("/wallpapertag")}>
                    Create TagsWallpaper
                </button>
                <button className="btn btn-warning" onClick={() => selectedTW && navigate(`/tags_wallpaper/${selectedTW}`)}
                    disabled={!selectedTW} >
                    Edit TagsWallpaper
                </button>
                <button className="btn btn-danger" onClick={handleDelete} disabled={!selectedTW}>
                    Delete TagsWallpaper
                </button>
            </div>
        </div>
    );
};

export default TagsWallpaperList;

