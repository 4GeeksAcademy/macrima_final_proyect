import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistaUpdate = () => {
    const [artistas, setArtistas] = useState([]); 
    const [error, setError] = useState(null); 
    const [message, setMessage] = useState(null); 
    const navigate = useNavigate(); 

    useEffect(() => {
        
        fetch('https://scaling-journey-pjp9jv5r4rr4h76jx-3001.app.github.dev/api/artistas')
            .then((response) => {
                if (!response.ok) {
                    setError(`Error en la solicitud: ${response.status}`);
                    return null; 
                }
                return response.json();
            })
            .then((data) => {
                if (data) {
                    setArtistas(data); 
                }
            })
            .catch((error) => {
                setError(`Error general: ${error.message}`);
            });
    }, []);

    const handleBackToMenu = () => {
        navigate('/artistaList');
    };

    const handleUpdate = (id) => {
        navigate(`/updateArtista/${id}`); 
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Lista de Artistas</h1>
            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}
            {message && (
                <div className="alert alert-info text-center" role="alert">
                    {message}
                </div>
            )}
            <ul className="list-group">
                {artistas.map((artista) => (
                    <li key={artista.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>Usuario:</strong> {artista.username} <br />
                            <strong>Email:</strong> {artista.email}
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <img
                                src={artista.avatar}
                                alt={artista.username}
                            />
                            <button
                                onClick={() => handleUpdate(artista.id)} 
                                className="btn btn-warning btn-sm"
                            >
                                Editar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={handleBackToMenu} className="btn btn-secondary mt-3">
                Volver al menú de botones
            </button>
        </div>
    );
};

export default ArtistaUpdate;
