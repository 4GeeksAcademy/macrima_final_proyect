import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const ArtistaForm = () => {
    const [infoArtista, setInfoArtista] = useState({
        email: '',
        username: '',
        password: '',
        avatar: '',
        address: '',
        latitude: null,
        longitude: null
    });
    const [message, setMessage] = useState(null); 
    const [error, setError] = useState(false); 
    const { actions } = useContext(Context);
    const navigate = useNavigate(); 
    const autocompleteRef = useRef(null);

    const handleChange = (e) => {
        setInfoArtista({
            ...infoArtista,
            [e.target.name]: e.target.value 
        });
    };

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.formatted_address && place.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            setInfoArtista(prev => ({
                ...prev,
                address: place.formatted_address,
                latitude: lat,
                longitude: lng
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { latitude, longitude } = infoArtista;

        if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
            setMessage("Debes seleccionar una dirección válida del autocompletado.");
            setError(true);
            return;
        }

        const newArtista = {
            email: infoArtista.email,
            password: infoArtista.password,
            username: infoArtista.username || null, 
            avatar: infoArtista.avatar || null, 
            address: infoArtista.address, 
            latitude: Number(latitude),
            longitude: Number(longitude)
        };

        try {
            const response = await actions.createArtistaView(newArtista);
            if (response) {
                setMessage("Artista creado con éxito");
                setError(false); 
                setInfoArtista({ email: '', username: '', password: '', avatar: '', address: '', latitude: null, longitude: null });
            } else {
                setMessage("Ocurrió un error al registrar al artista");
                setError(true); 
            }
        } catch (err) {
            console.error("Error al crear artista:", err);
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

            <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY} libraries={libraries}>
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
                        <Autocomplete onLoad={ref => (autocompleteRef.current = ref)} onPlaceChanged={handlePlaceChanged}>
                            <input
                                type="text"
                                name="address"
                                className="form-control"
                                value={infoArtista.address}
                                onChange={handleChange}
                                required
                            />
                        </Autocomplete>
                    </div>
                    <button type="submit" className="btn btn-primary">Registrar Artista</button>
                </form>
                <button onClick={handleBack} className="btn btn-secondary mt-3">
                    Volver al menú de botones
                </button>
            </LoadScript>
        </div>
    );
};

export default ArtistaForm;




