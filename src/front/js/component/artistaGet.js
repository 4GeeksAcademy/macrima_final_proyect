import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistaGet = () => {
    const [artistas, setArtistas] = useState([]); 
    const [error, setError] = useState(null); 
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

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Lista de Artistas</h1>
            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}
            <ul className="list-group">
                {artistas.map((artista) => (
                    <li key={artista.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>Usuario:</strong> {artista.username} <br />
                            <strong>Email:</strong> {artista.email}
                        </div>
                        <img
                            src={artista.avatar}
                            alt={artista.username}
                        />
                    </li>
                ))}
            </ul>
            <button onClick={handleBackToMenu} className="btn btn-secondary mt-3">
                Volver al menú de botones
            </button>
        </div>
    );
};

export default ArtistaGet;
