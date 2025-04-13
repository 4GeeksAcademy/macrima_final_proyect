import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const LoginFan = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    // Validar al cargar el componente si el perfil está completo
    useEffect(() => {
        const validateProfile = () => {
            if (store.authFan && store.fanFeedData) {
                // Verificar si description y email están completos
                const isDescriptionValid = store.fanFeedData.description && store.fanFeedData.description.trim() !== "";
                const isEmailValid = store.fanFeedData.email && store.fanFeedData.email.trim() !== "";

                if (!isDescriptionValid || !isEmailValid) {
                    console.log("Perfil incompleto, redirigiendo a /perfil.");
                    navigate("/perfil"); // Redirige a completar el perfil
                } else {
                    console.log("Perfil completo, redirigiendo a /fan/feed.");
                    navigate("/fan/feed"); // Redirige al feed
                }
            }
        };

        validateProfile();
    }, [store.authFan, store.fanFeedData, navigate]);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await actions.loginFan(data.username, data.password);
        if (success) {
            console.log("Login exitoso, verificando perfil...");

            // Obtener datos del perfil actualizados después del login
            await actions.getFanProfile();

            // Validar el perfil después del login
            const isDescriptionValid = store.fanFeedData?.description && store.fanFeedData.description.trim() !== "";
            const isEmailValid = store.fanFeedData?.email && store.fanFeedData.email.trim() !== "";

            if (!isDescriptionValid || !isEmailValid) {
                console.log("Perfil incompleto, redirigiendo a /perfil.");
                navigate("/perfil");
            } else {
                console.log("Perfil completo, redirigiendo a /fan/feed.");
                navigate("/fan/feed");
            }
        } else {
            console.log("Bad username or password");
        }
    };

    return (
        <div className="container mt-4 d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        className="form-control" 
                        value={data.username} 
                        onChange={handleChange} 
                        id="username" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={data.password} 
                        className="form-control" 
                        onChange={handleChange} 
                        id="password" 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default LoginFan;
