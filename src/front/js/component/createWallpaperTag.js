import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const CreatetagWallpaper = () => {
    const [infoTW, setInfoTW] = useState({
        id_tag: '',
        id_wallpaper: '',
    });
    const [message, setMessage] = useState(null); 
    const [Error, setError] = useState(false); 
    const { actions } = useContext(Context);
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setInfoTW({
            ...infoTW,
            [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await actions.newTagWallpaper(infoTW); 
        if (response) {
            setMessage("Tag asignado con exito");
            setError(false); 
            setInfoTW({ id_tag: '', id_wallpaper: ''});
        } else {
            setMessage("Ocurrió un error al asignar tag al wallpaper");
            setError(true); 
        }
    };
    
    const handleBack = () => {
        navigate(-1); 
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
                <button type="submit" className="btn btn-primary">Asignar Tag a Wallpaper</button>
            </form>
            <button onClick={handleBack} className="btn btn-secondary mt-3">
                Volver al menu de botones
            </button>
        </div>
    );
};

export default CreatetagWallpaper;
