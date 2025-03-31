import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";

const RegistraArtista = () => {
    const [infoArtista, setInfoArtista] = useState({
        email: '',
        username: '',
        password: '',
        avatar: ''
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
        const response = await actions.addArtist(infoArtista); 
        if (response) {
            setMessage("Artista creado con éxito");
            setIsError(false); 
            setInfoArtista({ email: '', username: '', password: '', avatar: '' });

            setTimeout(() => {
                navigate("/loginF-artista"); 
            }, 1500);
        } else {
            setMessage("Ocurrió un error al registrar al artista");
            setIsError(true); 
        }
    };
    
    const handleBack = () => {
        navigate("/loginF-artista"); 
    };
    const handleLogin = () => {
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
                <button type="submit" className="btn btn-primary">Registrar Artista</button>
                <Link to="/loginF-artista">
                                    <button className="btn btn-success">Ya tengo una cuenta!</button>
            </Link>
            </form>
            <button onClick={handleBack} className="btn btn-secondary mt-3">
                Volver al menú de botones
            </button>
        </div>
    );
};

export default RegistraArtista;
