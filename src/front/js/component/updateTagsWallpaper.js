import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

const UpdateTagsWallpaper = () => {
    const [infoTW, setinfoTW] = useState({
        id_tag: '',
        id_wallpaper: '',
        tag_name: '',
        wallpaper_nombre: ''
    });
    const [message, setMessage] = useState(null); 
    const [error, setError] = useState(false); 
    const { actions } = useContext(Context); 
    const navigate = useNavigate(); 
    const { id } = useParams(); 


    const handleChange = (e) => {
        setinfoTW({
            ...infoTW,
            [e.target.name]: e.target.value 
        });
    };

    
    useEffect(() => {
        const cargarDatosTW = async () => {
            try {
                console.log ('el id que se esta enviando es:', id)
                const data = await actions.getTagWallpaper(id);
                if (data) {
                    setinfoTW({
                        id_tag: data.tag.id || "",
                        id_wallpaper: data.wallpaper.id || "",
                        tag_name: data.tag.name || "",
                        wallpaper_nombre: data.wallpaper.nombre || "",
                    });
                } else {
                    setMessage("El TagWallpaper no existe o no se pudieron cargar los datos");
                    setError(true);
                }
            } catch (error) {
                console.error("Error al cargar los datos del TagWallpaper:", error);
                setMessage("Error al cargar los datos del TagWallpaper");
                setError(true);
            }
        };
        cargarDatosTW();
    }, [id]);
    
    const handleSubmit = async (e) => {
        console.log("Datos enviados al backend:", infoTW);
        e.preventDefault();
        try {
            const response = await actions.updateTagWallpaper(id, infoTW); 
            if (response) {
                setMessage("TagsWallpaper modificados con éxito");
                setError(false); 
                navigate(-1); 
            } else {
                setMessage("Ocurrió un error al modificar TagsWallpaper");
                setError(true); 
            }
        } catch (error) {
            console.error("Error al modificar TagsWallpaper:", error);
            setMessage("Error al modificar TagsWallpaper");
            setError(true);
        }
    };

    const handleBackToMenu = () => {
        navigate(-1); 
    };

    return (
        <div className="container mt-4">
           
            {message && (
                <div className={`alert ${error ? 'alert-danger' : 'alert-success'}`} role="alert">
                    {message}
                </div>
            )}
           
           <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Id Tag</label>
                    <input
                        type="text"
                        name="id_tag"
                        id="id_tag"
                        className="form-control"
                        value={infoTW.id_tag}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Id Wallpaper</label>
                    <input
                        type="text"
                        name="id_wallpaper"
                        id="id_wallpaper"
                        className="form-control"
                        value={infoTW.id_wallpaper}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Tag name</label>
                    <input
                        type="text"
                        name="tag_name"
                        id="tag_name"
                        className="form-control"
                        value={infoTW.tag_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Wallpaper name</label>
                    <input
                        type="text"
                        name="wallpaper_nombre"
                        id="wallpaper_nombre"
                        className="form-control"
                        value={infoTW.wallpaper_nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Editar Tags del Wallpaper</button>
            </form>
            <button onClick={handleBackToMenu} className="btn btn-secondary mt-3">
                Volver al menú de botones
            </button>
        </div>
    );
};

export default UpdateTagsWallpaper;
