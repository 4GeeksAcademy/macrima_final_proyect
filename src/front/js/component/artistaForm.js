import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const ArtistaForm = () => {
    const [infoArtista, setInfoArtista] = useState({
        email: '',
        username: '',
        password: '',
        avatar: ''
    });
    const [message, setMessage] = useState(null); 
    const [Error, setError] = useState(false); 
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
            setError(false); 
            setInfoArtista({ email: '', username: '', password: '', avatar: '' });
        } else {
            setMessage("Ocurrió un error al registrar al artista");
            setError(true); 
        }
    };
    
    const handleBackToMenu = () => {
        navigate('/artistaList'); 
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
            </form>
            <button onClick={handleBackToMenu} className="btn btn-secondary mt-3">
                Volver al menu de botones
            </button>
        </div>
    );
};

export default ArtistaForm;
