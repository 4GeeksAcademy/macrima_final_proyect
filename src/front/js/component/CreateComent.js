import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const CreateComent = () => {
    const [infoComent, setInfoComent] = useState({
        fan_id: '',
        wallpaper_id: '',
        content: '',
    });

    const [alert, setAlert] = useState({ message: null, type: '' });
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInfoComent({
            ...infoComent,
            [e.target.name]: e.target.value,
        });
    };


     const handleSubmit = async (e) => {
         e.preventDefault();


        if (!infoComent.fan_id || !infoComent.wallpaper_id || !infoComent.content) {
            setAlert({ message: 'Todos los campos son obligatorios', type: 'danger' });
            return;
         }

         const response = await actions.newComentWallpaper(infoComent);
         if (response) {
            setAlert({ message: 'Comentario asignado con éxito', type: 'success' });
            setInfoComent({ fan_id: '', wallpaper_id: '', content: '' });
        } else {
            setAlert({ message: 'Ocurrió un error al asignar comentario al wallpaper', type: 'danger' });
         }
     };

    return (
        <div className="container mt-4">
            {alert.message && (
                <div className={`alert alert-${alert.type}`} role="alert">
                    {alert.message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fan_id" className="form-label">Fan ID</label>
                    <input
                        type="text"
                        name="fan_id"
                        id="fan_id"
                        className="form-control"
                        value={infoComent.fan_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="wallpaper_id" className="form-label">Wallpaper ID</label>
                    <input
                        type="text"
                        name="wallpaper_id"
                        id="wallpaper_id"
                        className="form-control"
                        value={infoComent.wallpaper_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Contenido</label>
                    <input
                        type="text"
                        name="content"
                        id="content"
                        className="form-control"
                        value={infoComent.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Asignar Comentario a Wallpaper</button>
            </form>
            <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
                Volver al menú de botones
            </button>
        </div>
    );
};

export default CreateComent;
