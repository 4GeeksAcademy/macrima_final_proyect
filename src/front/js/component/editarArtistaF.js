import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Cloudinary from "../component/Cloudinary";

const EditarArtista = () => {
    const [infoArtista, setInfoArtista] = useState({
        email: '',
        username: '',
        password: '',
        avatar: '' 
    });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { actions, store } = useContext(Context);
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

    useEffect(() => {
        const cargarDatosArtista = async () => {
            if (!store.authArtistaFeed) {
                navigate("/loginF-artista");
                return;
            }
    
            try {
                const data = await actions.getSingleArtistProtected();
                if (data && data.logged) {
                    const { username, email, avatar } = data.logged;
                    setInfoArtista({
                        username: username || "",
                        email: email || "",
                        password: "",
                        avatar: avatar || "" 
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
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await actions.editarArtistaFeed(infoArtista);
            if (response) {
                setMessage("Artista modificado con éxito");
                setError(false);
                setTimeout(() => {
                    navigate('/feed-artista');
                }, 1500);
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
        <div className="container mt-4">
            {isLoading ? (
                <p>Cargando datos del artista...</p>
            ) : (
                <>
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
                        <button type="submit" className="btn btn-primary">Editar información</button>
                    </form>
                    <button onClick={handleBackToMenu} className="btn btn-secondary mt-3">
                        Volver al menú de botones
                    </button>
                </>
            )}
        </div>
    );
};

export default EditarArtista;
