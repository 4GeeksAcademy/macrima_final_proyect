import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const AddWallPaperForm = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        imagen: "",
        fecha: "",
        nombre: "",
        artista_id: ""
        
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await actions.newWallpaper(formData);
        if (result) {
            navigate("/wallpapers"); 
        } else {
            setError("Error creating wallpaper. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create Wallpaper </h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input type="text" className="form-control" name="imagen" value={formData.imagen} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha</label>
                    <input type="text" className="form-control" name="fecha" value={formData.fecha} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label"> Artista Id</label>
                    <input type= "text" className="form-control" name="artista_id" value={formData.artista_id} onChange={handleChange}/>
                </div>
                
                <button type="submit" className="btn btn-primary">Create Wallpaper</button>
            </form>
        </div>
    );
};

export default AddWallPaperForm;