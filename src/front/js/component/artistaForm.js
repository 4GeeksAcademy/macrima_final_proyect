import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const ArtistaForm = () => {
    const [infoArtista, setInfoArtista] = useState({
        email: '',
        username: '',
        password: '',
        avatar: '',
        address: ''
    });
    const [message, setMessage] = useState(null); 
    const [error, setError] = useState(false); 
    const { actions } = useContext(Context);
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setInfoArtista({
            ...infoArtista,
            [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const location = await actions.fetchGeocode(infoArtista.address);
            if (!location) {
                setMessage("Dirección inválida");
                setError(true);
                return;
            }

            const newArtista = {
                email: infoArtista.email,
                password: infoArtista.password,
                username: infoArtista.username || null, 
                avatar: infoArtista.avatar || null, 
                latitude: location?.lat || null, 
                longitude: location?.lng || null 
            };
            
            const response = await actions.createLocatedArtista(newArtista);
            if (response) {
                setMessage("Artista creado con éxito");
                setError(false); 
                setInfoArtista({ email: '', username: '', password: '', avatar: '', address: '' });
            } else {
                setMessage("Ocurrió un error al registrar al artista");
                setError(true); 
            }
        } catch (error) {
            console.error("Error al crear artista:", error);
            setMessage("Error inesperado");
            setError(true);
        }
    };
    
    const handleBack = () => {
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
                        className="form-control"
                        value={infoArtista.avatar}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Dirección</label>
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={infoArtista.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Registrar Artista</button>
            </form>
            <button onClick={handleBack} className="btn btn-secondary mt-3">
                Volver al menú de botones
            </button>
        </div>
    );
};

export default ArtistaForm;

