import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

const UpdateWallPaper = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const { paperId } = useParams();
    const [formData, setFormData] = useState({
        imagen: "",
        nombre: "",
        fecha: "",
        artista_id: "",
       
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadWallPaperData = async () => {
            try {
                const data = await actions.getWallpaperById(paperId);
    
                setFormData({
                    imagen: data.imagen || "",
                    nombre: data.nombre || "",
                    
                    fecha: data.fecha || "",
                    artista_id: data.artista_id || ""
                });
            } catch (error) {
                console.error("Error loading fan data:", error);
            }
        };
    
        loadWallPaperData();
    }, [paperId]);
    
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await actions.updateWallpaper(paperId, formData);
        if (result) {
            navigate("/wallpapers"); 
        } else {
            setError("Error updating wallpaper. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Update Wall Paper</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input type="text" className="form-control" name="imagen" value={formData.imagen} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha</label>
                    <input type="text" className="form-control" name="fecha" value={formData.fecha} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Id Artista</label>
                    <textarea className="form-control" name="artista_id" value={formData.artista_id} onChange={handleChange}></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary">Update Wallpaper</button>
            </form>
        </div>
    );
};

export default UpdateWallPaper;