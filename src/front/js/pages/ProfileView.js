import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

const ViewProfile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        // password: "",
        description: "",
        avatar: ""
    });

    useEffect(() => {
        actions.getFanProfile();
    }, []);

    useEffect(() => {
        if (store.fanFeedData) {
            setFormData(store.fanFeedData)
        }
    }, [store.fanFeedData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.updateFanProfile(formData);
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
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        className="form-control" 
                        placeholder="Username" 
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
                        />
                </div>
                {/* <div className="mb-3">
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className="form-control" 
                        placeholder="Contraseña" 
                        />
                </div> */}
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
                    <input 
                        type="text" 
                        name="avatar" 
                        value={formData.avatar} 
                        onChange={handleChange} 
                        className="form-control" 
                        placeholder="Avatar URL" 
                        />
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
