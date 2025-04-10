import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../store/appContext';

const RegistraArtista = () => {
    const [infoArtista, setInfoArtista] = useState({
        email: '',
        password: ''
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
            const newArtista = {
                email: infoArtista.email,
                password: infoArtista.password
            };

            const response = await actions.createLocatedArtista(newArtista);
            if (response) {
                setMessage("Artista creado con éxito");
                setIsError(false); 
                setInfoArtista({ email: '', password: '' });

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

