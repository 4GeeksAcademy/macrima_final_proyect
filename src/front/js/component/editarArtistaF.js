import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import Cloudinary from '../component/Cloudinary'; 

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
    const [autocomplete, setAutocomplete] = useState(null);
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

    const handleAvatarUpload = (url) => {
        setInfoArtista({ ...infoArtista, avatar: url });
    };

    const handlePlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            const address = place?.formatted_address || "";
            const location = place?.geometry?.location;

            if (address && location) {
                setInfoArtista({
                    ...infoArtista,
                    address,
                    latitude: location.lat(),
                    longitude: location.lng()
                });
            } else {
                console.error("No se encontró dirección o coordenadas en el lugar seleccionado.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            if (!infoArtista.latitude || !infoArtista.longitude) {
                setMessage("Por favor, selecciona una dirección válida.");
                setError(true);
                return;
            }

            const newArtista = {
                email: infoArtista.email,
                password: infoArtista.password,
                username: infoArtista.username || null,
                avatar: infoArtista.avatar || null,
                address: infoArtista.address,
                latitude: infoArtista.latitude,
                longitude: infoArtista.longitude
            };

            const response = await actions.createLocatedArtista(newArtista);
            if (response) {
                setMessage("Artista creado con éxito.");
                setError(false);
                setInfoArtista({
                    email: '',
                    username: '',
                    password: '',
                    avatar: '',
                    address: '',
                    latitude: null,
                    longitude: null
                });
            } else {
                setMessage("Ocurrió un error al registrar al artista.");
                setError(true);
            }
        } catch (error) {
            console.error("Error al crear artista:", error);
            setMessage("Error inesperado.");
            setError(true);
        }
    };

    const handleBack = () => {
        navigate('/artistas');
    };

    return (
        <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY} libraries={libraries}>
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
                        <Cloudinary onImageUpload={handleAvatarUpload} />
                        {infoArtista.avatar && (
                            <img
                                src={infoArtista.avatar}
                                alt="Avatar del artista"
                                className="mt-3"
                                style={{ maxWidth: "200px", borderRadius: "50%" }}
                            />
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Dirección</label>
                        <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceChanged}>
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
                    Volver al menú
                </button>
            </div>
        </LoadScript>
    );
};

export default ArtistaForm;





