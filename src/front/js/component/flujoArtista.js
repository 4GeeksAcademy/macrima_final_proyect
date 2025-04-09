import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../store/appContext';

const RegistraArtista = () => {
    const [infoArtista, setInfoArtista] = useState({
        email: '',
        username: '',
        password: '',
        avatar: '',
        address: ''
    });
    const [message, setMessage] = useState(null); 
    const [isError, setIsError] = useState(false); 
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
                setIsError(true);
                return;
            }

            const newArtista = {
                username: infoArtista.username,
                email: infoArtista.email,
                avatar: infoArtista.avatar,
                password: infoArtista.password,
                latitude: location.lat,
                longitude: location.lng
            };

            const response = await actions.createLocatedArtista(newArtista); 
            if (response) {
                setMessage("Artista creado con éxito");
                setIsError(false); 
                setInfoArtista({ email: '', username: '', password: '', avatar: '', address: '' });

                setTimeout(() => {
                    navigate("/loginF-artista"); 
                }, 1500);
            } else {
                setMessage("Ocurrió un error al registrar al artista");
                setIsError(true); 
            }
        } catch (error) {
            console.error("Error al crear artista:", error);
            setMessage("Error inesperado al crear el artista");
            setIsError(true);
        }
    };
    
    const handleBack = () => {
        navigate("/loginF-artista"); 
    };

    return (
        <div className="container mt-4">
            {message && (
                <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`} role="alert">
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
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Dirección</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        className="form-control"
                        value={infoArtista.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary me-2">Registrar Artista</button>
                <Link to="/loginF-artista">
                    <button type="button" className="btn btn-success">Ya tengo una cuenta!</button>
                </Link>
            </form>
            <button onClick={handleBack} className="btn btn-secondary mt-3">
                Volver al menú de botones
            </button>
        </div>
    );
};

export default RegistraArtista;

