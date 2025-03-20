import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Artistas = () => {
    const [artistas, setArtistas] = useState([]); 
    const [error, setError] = useState(null); 
    const [message, setMessage] = useState(null); 
    const navigate = useNavigate(); 
   

    useEffect(() => {
        
        fetch(process.env.BACKEND_URL + `/api/artistas`)
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

    const handleBack = () => {
        navigate(-1);
    };

    const handleUpdate = (id) => {
        navigate(`/artistas/${id}`); 
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/artistas/delete/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error al eliminar: ${response.status}`);
            }

            const data = await response.json();
            setMessage(data.message); 
            setArtistas(artistas.filter((artista) => artista.id !== id)); 
        } catch (error) {
            setMessage(`Error al eliminar: ${error.message}`);
        }
};

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Lista de Artistas</h1>
            <button onClick={() => navigate("/artistaForm")} style={{ backgroundColor: '#3375FF', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
                    Add
                </button>
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
                            <button
                                onClick={() => handleDelete(artista.id)} 
                                className="btn btn-danger btn-sm"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={handleBack} className="btn btn-secondary mt-3">
                Volver al menú de botones
            </button>
        </div>
    );
};

export default Artistas;
