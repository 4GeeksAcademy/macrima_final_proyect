import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

const UpdateFavoritos = () => {
    const [infoFavorito, setinfoFavorito] = useState({
        id_fan: '',
        id_wallpaper: '',
        fan_username: '',
        wallpaper_nombre: ''
    });
    const [message, setMessage] = useState(null); 
    const [error, setError] = useState(false); 
    const { actions } = useContext(Context); 
    const navigate = useNavigate(); 
    const { id } = useParams(); 


    const handleChange = (e) => {
        setinfoFavorito({
            ...infoFavorito,
            [e.target.name]: e.target.value 
        });
    };

    
    useEffect(() => {
        const loadDataFavoritos = async () => {
            try {
                console.log ('el id que se esta enviando es:', id)
                const data = await actions.getSingleFavorito(id);
                if (data) {
                    setinfoFavorito({
                        id_fan: data.fan.id || "",
                        id_wallpaper: data.wallpaper.id || "",
                        fan_username: data.fan.username || "",
                        wallpaper_nombre: data.wallpaper.nombre || "",
                    });
                } else {
                    setMessage("El favorito no existe o no se pudieron cargar los datos");
                    setError(true);
                }
            } catch (error) {
                console.error("Error al cargar los datos del favorito:", error);
                setMessage("Error al cargar los datos del favorito");
                setError(true);
            }
        };
        loadDataFavoritos();
    }, [id]);
    
    const handleSubmit = async (e) => {
        console.log("Datos enviados al backend:", infoFavorito);
        e.preventDefault();
        try {
            const response = await actions.updateFavoritos(id, infoFavorito); 
            if (response) {
                setMessage("Favoritos modificados con éxito");
                setError(false); 
                navigate(-1); 
            } else {
                setMessage("Ocurrió un error al modificar Favoritos");
                setError(true); 
            }
        } catch (error) {
            console.error("Error al modificar Favoritos:", error);
            setMessage("Error al modificar Favoritos");
            setError(true);
        }
    };

    const handleBackToMenu = () => {
        navigate("/favoritos"); 
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
                    <label htmlFor="id_fan" className="form-label">Id fan</label>
                    <input
                        type="text"
                        name="id_fan"
                        id="id_fan"
                        className="form-control"
                        value={infoFavorito.id_fan}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="id_wallpaper" className="form-label">Id Wallpaper</label>
                    <input
                        type="text"
                        name="id_wallpaper"
                        id="id_wallpaper"
                        className="form-control"
                        value={infoFavorito.id_wallpaper}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fan_username" className="form-label">Fan username</label>
                    <input
                        type="text"
                        name="fan_username"
                        id="fan_username"
                        className="form-control"
                        value={infoFavorito.fan_username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="wallpaper_nombre" className="form-label">Wallpaper name</label>
                    <input
                        type="text"
                        name="wallpaper_nombre"
                        id="wallpaper_nombre"
                        className="form-control"
                        value={infoFavorito.wallpaper_nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Editar Favorito</button>
            </form>
            <button onClick={handleBackToMenu} className="btn btn-secondary mt-3">
                Volver al menú 
            </button>
        </div>
    );
};

export default UpdateFavoritos;
