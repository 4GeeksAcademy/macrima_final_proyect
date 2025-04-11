import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import Cloudinary from '../component/Cloudinary';

const libraries = ['places'];

const EditarArtista = () => {
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
    const [isLoading, setIsLoading] = useState(true);

    const { actions, store } = useContext(Context);
    const autocompleteRef = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams();

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

    useEffect(() => {
        const cargarDatosArtista = async () => {
            if (!store.authArtistaFeed) {
                navigate("/loginF-artista");
                return;
            }
            try {
                const data = await actions.getSingleArtistProtected();
                if (data?.logged) {
                    const { username, email, avatar, address, latitude, longitude } = data.logged;
                    setInfoArtista({
                        username: username || "",
                        email: email || "",
                        password: "",
                        avatar: avatar || "",
                        address: address || "",
                        latitude: latitude || null,
                        longitude: longitude || null
                    });
                } else {
                    setMessage("El artista no existe o no se pudieron cargar los datos");
                    setError(true);
                }
            } catch (error) {
                console.error("Error al cargar los datos del artista:", error);
                setMessage("Error al cargar los datos del artista");
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        cargarDatosArtista();
    }, [id, store.authArtistaFeed]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { latitude, longitude } = infoArtista;

            if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
                setMessage("Debes seleccionar una dirección válida del autocompletado.");
                setError(true);
                return;
            }

            const updatedArtista = {
                email: infoArtista.email,
                username: infoArtista.username,
                password: infoArtista.password,
                avatar: infoArtista.avatar,
                address: infoArtista.address,
                latitude,
                longitude
            };

            const response = await actions.editarArtistaFeed(updatedArtista);

            if (response) {
                setMessage("Artista modificado con éxito");
                setError(false);
                setTimeout(() => navigate('/feed-artista'), 1500);
            } else {
                setMessage("Ocurrió un error al modificar al artista");
                setError(true);
            }
        } catch (error) {
            console.error("Error al modificar el artista:", error);
            setMessage("Error al modificar el artista");
            setError(true);
        }
    };

    const handleBackToMenu = () => {
        navigate(-1);
    };

    return (
        <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY} libraries={libraries}>
            <div className="container mt-4">
                {message && (
                    <div className={`alert ${error ? 'alert-danger' : 'alert-success'}`} role="alert">
                        {message}
                    </div>
                )}
                {!isLoading && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Correo Electrónico</label>
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
                            <label className="form-label">Contraseña</label>
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
                            <label className="form-label">Nombre de Usuario</label>
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
                            <label className="form-label">Avatar</label>
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
                            <label className="form-label">Dirección</label>
                            <Autocomplete
                                onLoad={autocomplete => (autocompleteRef.current = autocomplete)}
                                onPlaceChanged={handlePlaceChanged}
                            >
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
                        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                    </form>
                )}
                <button onClick={handleBackToMenu} className="btn btn-secondary mt-3">
                    Volver al menú
                </button>
            </div>
        </LoadScript>
    );
};

export default EditarArtista;






