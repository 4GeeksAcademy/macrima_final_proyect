import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Cloudinary from "../component/Cloudinary";

const EditarWallpaperYAgregarTag = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const { wallpaperId } = useParams();
    const [formData, setFormData] = useState({
        imagen: "",
        nombre: "",
        fecha: "",
        artista_id: "",
        tag_id: "" 
    });
    const [tags, setTags] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [associatedTags, setAssociatedTags] = useState([]); 

    useEffect(() => {
        const cargarDatos = async () => {
            if (!store.authArtistaFeed) {
                navigate("/loginF-artista");
                return;
            }
            try {
                
                const wallpaperData = await actions.getWallpaperById(wallpaperId);
                if (wallpaperData) {
                    setFormData((prevData) => ({
                        ...prevData,
                        imagen: wallpaperData.imagen || "",
                        nombre: wallpaperData.nombre || "",
                        fecha: wallpaperData.fecha || "",
                        artista_id: wallpaperData.artista_id || "",
                    }));
                }

                
                const tagWallpaperRelations = store.TagsWallpapers?.filter(
                    (relation) => relation.wallpaper.id === parseInt(wallpaperId)
                );
                if (tagWallpaperRelations) {
                    setAssociatedTags(tagWallpaperRelations.map((relation) => relation.tag.id));
                }

                
                const tagsData = await actions.getTags();
                if (tagsData) {
                    setTags(tagsData.tags);
                } else {
                    setError("Error al cargar las etiquetas.");
                }
            } catch (error) {
                console.error("Error al cargar los datos:", error);
                setError("Error al cargar los datos.");
            }
        };

        cargarDatos();
    }, [wallpaperId, store.TagsWallpapers]);

    const handleImageUpload = (imageUrl) => {
        setFormData({ ...formData, imagen: imageUrl });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const updateResult = await actions.updateWallpaper(wallpaperId, {
                imagen: formData.imagen,
                nombre: formData.nombre,
                fecha: formData.fecha,
                artista_id: formData.artista_id
            });

            
            let tagResult = true;
            if (formData.tag_id) {
                tagResult = await actions.newTagWallpaper({
                    id_wallpaper: wallpaperId,
                    id_tag: formData.tag_id
                });
            }

            if (updateResult && tagResult) {
                setSuccessMessage("El wallpaper se actualizó correctamente.");
                setTimeout(() => {
                    navigate(-1);
                }, 1500);
            } else {
                setError("Error al actualizar el wallpaper o agregar el tag.");
            }
        } catch (error) {
            console.error("Error al enviar:", error);
            setError("Hubo un problema al procesar los cambios.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Editar Wallpaper y Agregar Tag</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Subir Imagen</label>
                    <Cloudinary onImageUpload={handleImageUpload} />
                    {formData.imagen && (
                        <img
                            src={formData.imagen}
                            alt="Vista previa"
                            style={{ width: "200px", height: "auto", marginTop: "10px" }}
                        />
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
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
                    <label className="form-label">Seleccionar Tag</label>
                    <select
                        className="form-select"
                        name="tag_id"
                        value={formData.tag_id}
                        onChange={handleChange}
                    >
                        <option value="">Selecciona un Tag</option>
                        {tags.map((tag) => (
                            <option
                                key={tag.id}
                                value={tag.id}
                                disabled={associatedTags.includes(tag.id)}
                            >
                                {tag.name} {associatedTags.includes(tag.id) ? "(Ya asignado)" : ""}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditarWallpaperYAgregarTag;
