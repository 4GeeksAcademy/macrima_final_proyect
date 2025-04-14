import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const LoginFan = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        const validateProfile = () => {
            if (store.authFan && store.fanFeedData) {
                const isDescriptionValid = store.fanFeedData.description && store.fanFeedData.description.trim() !== "";
                const isEmailValid = store.fanFeedData.email && store.fanFeedData.email.trim() !== "";

                if (!isDescriptionValid || !isEmailValid) {
                    console.log("Perfil incompleto, redirigiendo a /perfil.");
                    navigate("/perfil");
                } else {
                    console.log("Perfil completo, redirigiendo a /fan/feed.");
                    navigate("/fan/feed");
                }
            }
        };

        validateProfile();
    }, [store.authFan, store.fanFeedData, navigate]);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await actions.loginFan(data.username, data.password);
        if (success) {
            console.log("Login exitoso, verificando perfil...");
            await actions.getFanProfile();

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
        <div
            className="login-container d-flex"
            style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#e0e0e0" }}
        >
            <div className="form-section p-5" style={{ flex: 1 }}>
                <h2
                    className="text-left mb-4"
                    style={{
                        color: "#ffffff",
                        textAlign: "left",
                        marginBottom: "1rem",
                    }}
                >
                    Bienvenido Fan
                </h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label" style={{ color: "#e0e0e0" }}>
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            value={data.username}
                            onChange={handleChange}
                            id="username"
                            placeholder="Ingresa tu username"
                            style={{
                                backgroundColor: "#1e1e1e",
                                color: "#e0e0e0",
                                border: "1px solid #424242",
                            }}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label" style={{ color: "#e0e0e0" }}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={data.password}
                            onChange={handleChange}
                            id="password"
                            placeholder="Ingresa tu contraseña"
                            style={{
                                backgroundColor: "#1e1e1e",
                                color: "#e0e0e0",
                                border: "1px solid #424242",
                            }}
                            required
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
                    backgroundColor: "#121212",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    textAlign: "center",
                    overflow: "hidden",
                }}
            >
                <img
                    src="https://res.cloudinary.com/dciy2gw7z/image/upload/v1744601732/j3nsnzgksbycc7lb4pzv.png"
                    alt="Decorativo"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </div>
        </div>
    );
};

export default LoginFan;
