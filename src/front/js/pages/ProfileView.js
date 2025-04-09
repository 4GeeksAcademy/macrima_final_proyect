import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import Cloudinary from "../component/Cloudinary";

const ViewProfile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        description: "",
        avatar: ""
    });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        actions.getFanProfile();
    }, []);

    useEffect(() => {
        if (store.fanFeedData) {
            setFormData({
                username: store.fanFeedData.username || "",
                email: store.fanFeedData.email || "",
                description: store.fanFeedData.description || "",
                avatar: store.fanFeedData.avatar || ""
            });
        }
    }, [store.fanFeedData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAvatarUpload = (url) => {
        setFormData({ ...formData, avatar: url });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await actions.updateFanProfile(formData);
            if (response) {
                setMessage("Perfil actualizado con éxito.");
                setError(false);
                
            } else {
                setMessage("Ocurrió un error al actualizar el perfil.");
                setError(true);
                
            }
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            setMessage("Error al actualizar el perfil.");
            setError(true);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (store.loading) return <p>Cargando perfil...</p>;

    return (
        <>
            <div className="text-center mt-4 mb-3">
                <h2>Editar Perfil</h2>
            </div>
            <div className="container mt-4 d-flex justify-content-center">
                <div className="w-50">
                    {message && (
                        <div className={`alert ${error ? 'alert-danger' : 'alert-success'}`} role="alert">
                            {message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Username"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Correo electrónico"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Descripción"
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Avatar</label>
                            <Cloudinary onImageUpload={handleAvatarUpload} />
                            {formData.avatar && (
                                <img
                                    src={formData.avatar}
                                    alt="Avatar del perfil"
                                    className="mt-3"
                                    style={{ maxWidth: "200px", borderRadius: "50%" }}
                                />
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Guardar cambios</button>
                    </form>
                    <button onClick={handleBack} className="btn btn-secondary w-100 mt-3">
                        Volver al feed
                    </button>
                </div>
            </div>
        </>
    );
};

export default ViewProfile;
