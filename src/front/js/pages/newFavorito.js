import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const NewFavorito = () => {
    const [infoFavorito, setInfoFavorito] = useState({
        id_fan: '',
        id_wallpaper: '',
    });
    const [message, setMessage] = useState(null); 
    const [Error, setError] = useState(false); 
    const { actions } = useContext(Context);
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setInfoFavorito({
            ...infoFavorito,
            [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await actions.newFavorito(infoFavorito); 
        if (response) {
            setMessage("Favorito creado");
            setError(false); 
            setInfoFavorito({ id_fan: '', id_wallpaper: ''});
        } else {
            setMessage("Ocurrió un error al crear favorito");
            setError(true); 
        }
    };
    
    const handleBack = () => {
        navigate("/favoritos"); 
    };

    return (
        <div className="container mt-4">
            {message && (
                <div className={`alert ${Error ? 'alert-danger' : 'alert-success'}`} role="alert">
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="id_fan" className="form-label">Id Fan</label>
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
                <button type="submit" className="btn btn-primary">Crear Favorito</button>
            </form>
            <button onClick={handleBack} className="btn btn-secondary mt-3">
                Volver al menu 
            </button>
        </div>
    );
};

export default NewFavorito;