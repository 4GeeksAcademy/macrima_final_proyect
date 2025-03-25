import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

const UpdateMeGusta = () => {
    const [infoMeGusta, setInfoMeGusta] = useState({
        id_fan: '',
        id_wallpaper: ''
    });
    const [message, setMessage] = useState(null); 
    const [error, setError] = useState(false); 
    const { actions } = useContext(Context); 
    const navigate = useNavigate(); 
    const { id } = useParams(); 

    const handleChange = (e) => {
        setInfoMeGusta({
            ...infoMeGusta,
            [e.target.name]: e.target.value 
        });
    };

    useEffect(() => {
        const loadDataMeGusta = async () => {
            try {
                console.log('El ID que se está enviando es:', id);
                const data = await actions.getSingleMeGusta(id); 
                if (data) {
                    setInfoMeGusta({
                        id_fan: data.fan.id || "",
                        id_wallpaper: data.wallpaper.id || ""
                    });
                } else {
                    setMessage("El registro Me Gusta no existe o no se pudieron cargar los datos");
                    setError(true);
                }
            } catch (error) {
                console.error("Error al cargar los datos de Me Gusta:", error);
                setMessage("Error al cargar los datos de Me Gusta");
                setError(true);
            }
        };
        loadDataMeGusta();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Datos enviados al backend:", infoMeGusta);
            const response = await actions.updateMeGusta(id, infoMeGusta); 
            if (response) {
                setMessage("Me Gusta modificado con éxito");
                setError(false); 
                navigate(-1); 
            } else {
                setMessage("Ocurrió un error al modificar Me Gusta");
                setError(true); 
            }
        } catch (error) {
            console.error("Error al modificar Me Gusta:", error);
            setMessage("Error al modificar Me Gusta");
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
                    <label htmlFor="id_fan" className="form-label">Id Fan</label>
                    <input
                        type="text"
                        name="id_fan"
                        id="id_fan"
                        className="form-control"
                        value={infoMeGusta.id_fan}
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
                        value={infoMeGusta.id_wallpaper}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Editar Me Gusta</button>
            </form>
            <button onClick={handleBackToMenu} className="btn btn-secondary mt-3">
                Volver al menú 
            </button>
        </div>
    );
};

export default UpdateMeGusta;
