import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

const UpdateComent = () => {
    const [infoContent, setinfoContent] = useState({
        fan_id: '',
        wallpaper_id: '',
        content: '',
    });
    const [message, setMessage] = useState(null); 
    const [error, setError] = useState(false); 
    const { actions } = useContext(Context); 
    const navigate = useNavigate(); 
    const { id } = useParams(); 


    const handleChange = (e) => {
        setinfoContent({
            ...infoContent,
            [e.target.name]: e.target.value 
        });
    };

    
    useEffect(() => {
        const chargueComents = async () => {
            try {
                console.log ('el id que se esta enviando es:', id)
                const data = await actions.getComentAtWallpaper(id);
                if (data) {
                    setinfoContent({
                        fan_id: data.fan.id || "",
                        wallpaper_id: data.wallpaper.id || "",
                        content: data.content || "",
                    });
                } else {
                    setMessage("El Wallpaper no existe o no se pudieron cargar los comentarios");
                    setError(true);
                }
            } catch (error) {
                console.error("Error al cargar los comentarios del Wallpaper:", error);
                setMessage("Error al cargar los comentarios del Wallpaper");
                setError(true);
            }
        };
        chargueComents();
    }, [id]);
    
    const handleSubmit = async (e) => {
        console.log("Datos enviados al backend:", infoContent);
        e.preventDefault();
        try {
            const response = await actions.updateComentWallpaper(id, infoContent); 
            if (response) {
                setMessage("Wallpaper modificado con éxito");
                setError(false); 
                navigate(-1); 
            } else {
                setMessage("Ocurrió un error al modificar Wallpaper");
                setError(true); 
            }
        } catch (error) {
            console.error("Error al modificar el comentario del Wallpaper:", error);
            setMessage("Error al modificar el comentario del Wallpaper");
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
                    <label htmlFor="fan_id" className="form-label">Fan id</label>
                    <input
                        type="text"
                        name="fan_id"
                        id="fan_id"
                        className="form-control"
                        value={infoContent.fan_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="wallpaper_id" className="form-label">Wallpaper id</label>
                    <input
                        type="text"
                        name="wallpaper_id"
                        id="wallpaper_id"
                        className="form-control"
                        value={infoContent.wallpaper_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <input
                        type="text"
                        name="content"
                        id="content"
                        className="form-control"
                        value={infoContent.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Editar Comentario del Wallpaper</button>
            </form>
            <button onClick={handleBackToMenu} className="btn btn-secondary mt-3">
                Volver al menú de botones
            </button>
        </div>
    );
};

export default UpdateComent;
