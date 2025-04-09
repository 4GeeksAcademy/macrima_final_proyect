import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const LoginArtistaF = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
        rememberMe: false
    });

    useEffect(() => {
        if (store.authArtistaFeed) {
            navigate("/feed-artista");
        }
    }, [store.authArtistaFeed]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData({
            ...data,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.loginArtistaFeed(data.email, data.password);
        if (success) {
            navigate("/feed-artista");
        } else {
            console.log("Email o contraseña incorrectos");
        }
    };

    return (
        <div className="login-container d-flex" style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#e0e0e0" }}>

            <div className="form-section p-5" style={{ flex: 1 }}>
                <h2 className="text-center mb-4" style={{ color: "#ffffff" }}>Bienvenido de nuevo</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" style={{ color: "#e0e0e0" }}>Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={data.email}
                            onChange={handleChange}
                            id="email"
                            placeholder="Ingresa tu correo electrónico"
                            style={{ backgroundColor: "#1e1e1e", color: "#e0e0e0", border: "1px solid #424242" }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label" style={{ color: "#e0e0e0" }}>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={data.password}
                            onChange={handleChange}
                            id="password"
                            placeholder="Ingresa tu contraseña"
                            style={{ backgroundColor: "#1e1e1e", color: "#e0e0e0", border: "1px solid #424242" }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        style={{ backgroundColor: "#6a11cb", border: "none" }}
                    >
                        Iniciar Sesión
                    </button>

                </form>
            </div>

            <div
                className="decorative-section"
                style={{
                    flex: 1,
                    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    textAlign: "center"
                }}
            >
                <div>
                    <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>¡Hola de nuevo!</h1>
                    <p style={{ fontSize: "1.2rem" }}>Nos alegra verte de vuelta.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginArtistaF;
