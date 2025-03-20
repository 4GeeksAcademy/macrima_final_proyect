import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

const FormUpdate = () => {
    const [infoArtista, setInfoArtista] = useState({
        email: '',
        username: '',
        password: '',
        avatar: ''
    });
    const [message, setMessage] = useState(null); 
    const [error, setError] = useState(false); 
    const { actions } = useContext(Context); 
    const navigate = useNavigate(); 
    const { id } = useParams(); 


    const handleChange = (e) => {
        setInfoArtista({
            ...infoArtista,
            [e.target.name]: e.target.value 
        });
    };

    
    useEffect(() => {
        const cargarDatosArtista = async () => {
            try {
                console.log ('el id que se esta enviando es:', id)
                const data = await actions.getSingleArtist(id);
                if (data) {
                    setInfoArtista({
                        username: data.username || "",
                        email: data.email || "",
                        password: "",
                        avatar: data.avatar || ""
                    });
                } else {
                    setMessage("El artista no existe o no se pudieron cargar los datos");
                    setError(true);
                }
            } catch (error) {
                console.error("Error al cargar los datos del artista:", error);
                setMessage("Error al cargar los datos del artista");
                setError(true);
            }
        };
        cargarDatosArtista();
    }, [id]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await actions.updateArtist(id, infoArtista); 
            if (response) {
                setMessage("Artista modificado con éxito");
                setError(false); 
                navigate('/'); 
            } else {
                setMessage("Ocurrió un error al modificar al artista");
                setError(true); 
            }
        } catch (error) {
            console.error("Error al modificar el artista:", error);
            setMessage("Error al modificar el artista");
            setError(true);
        }
    };

    const handleBackToMenu = () => {
        navigate('/artistas'); 
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
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        value={infoArtista.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        value={infoArtista.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        value={infoArtista.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="avatar" className="form-label">Avatar (URL)</label>
                    <input
                        type="text"
                        name="avatar"
                        id="avatar"
                        className="form-control"
                        value={infoArtista.avatar}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Editar Artista</button>
            </form>
            <button onClick={handleBackToMenu} className="btn btn-secondary mt-3">
                Volver al menú de botones
            </button>
        </div>
    );
};

export default FormUpdate;
