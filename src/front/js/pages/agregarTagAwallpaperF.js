import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const AgregarTagAwallpaperF = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const { wallpaperId } = useParams(); // Capturar el ID del wallpaper desde la URL
    const [formData, setFormData] = useState({
        tag_id: "",
    });
    const [wallpaper, setWallpaper] = useState(null); // Para guardar el wallpaper seleccionado
    const [tags, setTags] = useState([]); 
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); // Mensaje de éxito
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTagsAndWallpaper = async () => {
            try {
                // Obtener los tags disponibles
                const tagsData = await actions.getTags();
                if (tagsData) {
                    setTags(tagsData.tags); 
                } else {
                    setError("Error al cargar las etiquetas.");
                }

                // Obtener el wallpaper seleccionado
                const selectedWallpaper = store.wallpapers.find((wp) => wp.id === parseInt(wallpaperId));
                if (selectedWallpaper) {
                    setWallpaper(selectedWallpaper); // Guardar el wallpaper en el estado
                } else {
                    setError("No se encontró el wallpaper.");
                }
            } catch (error) {
                console.error("Error al cargar los datos:", error);
                setError("Error al cargar los datos.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTagsAndWallpaper();
    }, [wallpaperId]);

    const handleTagChange = (e) => {
        setFormData({ ...formData, tag_id: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await actions.newTagWallpaper({
            id_wallpaper: wallpaperId, // ID del wallpaper seleccionado
            id_tag: formData.tag_id, // ID del tag seleccionado
        });
        if (result) {
            setSuccessMessage("El tag se agregó correctamente."); // Mostrar mensaje de éxito
            setTimeout(() => {
                setSuccessMessage(null); // Ocultar mensaje después de unos segundos
                navigate("/feed-artista");
            }, 1500);
        } else {
            setError("Error al agregar el tag. Por favor, inténtalo de nuevo.");
        }
        console.log("ID enviado", wallpaperId, formData.tag_id);
    };

    return (
        <div className="container mt-5">
            <h2>Agregar Tag al Wallpaper</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {isLoading ? (
                <p>Cargando datos...</p>
            ) : (
                wallpaper && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nombre del Wallpaper</label>
                            <input
                                type="text"
                                className="form-control"
                                value={wallpaper.nombre}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Seleccionar Tag</label>
                            <select
                                className="form-select"
                                name="tag_id"
                                value={formData.tag_id}
                                onChange={handleTagChange}
                                required
                            >
                                <option value="">Selecciona un Tag</option>
                                {tags.map((tag) => (
                                    <option key={tag.id} value={tag.id}>
                                        {tag.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Agregar Tag
                        </button>
                    </form>
                )
            )}
        </div>
    );
};

export default AgregarTagAwallpaperF;
