import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Cloudinary from "../component/Cloudinary";

const PublicarWallpaper = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        imagen: "",
        fecha: "",
        nombre: "",
        nombre_wallpaper: "",
        artista_id: ""
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArtist = async () => {
            if (!store.authArtistaFeed) {
                navigate("/loginF-artista");
                return;
            }

            try {
                const artistData = await actions.getSingleArtistProtected();
                if (artistData && artistData.logged) {
                    setFormData({
                        ...formData,
                        artista_id: artistData.logged.id
                    });
                } else {
                    setError("Error al cargar la información del artista.");
                }
            } catch (error) {
                console.error("Error al cargar los datos:", error);
                setError("Error al cargar los datos.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchArtist();
    }, []);

    const handleImageUpload = (url) => {
        setFormData({ ...formData, imagen: url }); 
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await actions.publicar_wallpaper({
            imagen: formData.imagen,
            fecha: formData.fecha,
            nombre: formData.nombre,
            nombre_wallpaper: formData.nombre_wallpaper
        });
        if (result) {
            navigate("/feed-artista");
        } else {
            setError("Error al crear el wallpaper. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Crear Wallpaper</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {isLoading ? (
                <p>Cargando datos del artista...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Subir Imagen</label>
                        <Cloudinary onImageUpload={handleImageUpload} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha</label>
                        <input
                            type="text"
                            className="form-control"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Título del Wallpaper</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Crear Wallpaper
                    </button>
                </form>
            )}
        </div>
    );
};

export default PublicarWallpaper;
