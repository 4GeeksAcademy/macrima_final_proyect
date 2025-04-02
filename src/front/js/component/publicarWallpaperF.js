import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const PublicarWallpaper = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        imagen: "",
        fecha: "",
        nombre: "",
        nombre_wallpaper: "",
        artista_id: "",
        tag_id: "" 
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tags, setTags] = useState([]); 
    
    
    // useEffect(() => {
    //     const fetchTagsAndArtist = async () => {
    //         if (!store.authArtistaFeed) {
    //             navigate("/loginF-artista");
    //         }
    //         try {
    //             const tagsData = await actions.getTags();
    //             if (tagsData) {
    //                 setTags(tagsData.tags); 
    //             } else {
    //                 setError("Error al cargar las etiquetas.");
    //             }
    //             const artistData = await actions.getSingleArtistProtected();
    //             if (artistData && artistData.logged) {
    //                 setFormData({
    //                     ...formData,
    //                     artista_id: artistData.logged.id
    //                 });
    //             } else {
    //                 setError("Error al cargar la información del artista.");
    //             }
    //         } catch (error) {
    //             console.error("Error al cargar los datos:", error);
    //             setError("Error al cargar los datos.");
    //         } finally {
    //             setIsLoading(false);
    //         }           
    //     };
    //     fetchTagsAndArtist();
    // }, []);
    useEffect(() => {
        const fetchTagsAndArtist = async () => {
            if (!store.authArtistaFeed) {
                navigate("/loginF-artista");
                return; // Sal de la función si el usuario no está autenticado
            }
    
            try {
                const tagsData = await actions.getTags();
                if (tagsData) {
                    setTags(tagsData.tags); 
                } else {
                    setError("Error al cargar las etiquetas.");
                }
    
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
    
        fetchTagsAndArtist();
    }, []);
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTagChange = (e) => {
        setFormData({ ...formData, tag_id: e.target.value }); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await actions.publicar_wallpaper({
            imagen: formData.imagen,
            fecha: formData.fecha,
            nombre: formData.nombre,
            nombre_wallpaper: formData.nombre_wallpaper,
            tag_id: formData.tag_id 
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
                <p>Cargando datos del artista y etiquetas...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Imagen</label>
                        <input
                            type="text"
                            className="form-control"
                            name="imagen"
                            value={formData.imagen}
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
                    {/* <div className="mb-3">
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
                    </div> */}
                    <button type="submit" className="btn btn-primary">
                        Crear Wallpaper
                    </button>
                </form>
            )}
        </div>
    );
};

export default PublicarWallpaper;
