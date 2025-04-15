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
    }, [store.authFan, store.fanFeedData]);

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
            console.log("Usuario o contraseña incorrectos.");
        }
    };

    return (
        <div
            className="login-container d-flex"
            style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#e0e0e0" }}
        >
            <div
                className="form-section mt-50px"
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <form onSubmit={handleSubmit} className="m-4 p-5">
                    <div className="mb-4">
                        <h2
                            className="mb-4"
                            style={{
                                color: "#ffffff",
                                textAlign: "left",
                                fontSize: "2rem",
                                marginBottom: "1rem",
                            }}
                        >
                            Bienvenido Fan
                        </h2>
                        <label
                            htmlFor="username"
                            className="form-label fs-base"
                            style={{
                                color: "#e0e0e0",
                                fontSize: "1rem",
                            }}
                        >
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
                            required=""
                            style={{
                                backgroundColor: "#1e1e1e",
                                color: "#e0e0e0",
                                border: "1px solid #424242",
                                width: "450px",
                                height: "50px",
                                fontSize: "1rem",
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="form-label fs-base"
                            style={{
                                color: "#e0e0e0",
                                fontSize: "1rem",
                            }}
                        >
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
                            required=""
                            style={{
                                backgroundColor: "#1e1e1e",
                                color: "#e0e0e0",
                                border: "1px solid #424242",
                                width: "450px",
                                height: "50px",
                                fontSize: "1rem",
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                            backgroundColor: "#6a11cb",
                            border: "none",
                            width: "450px",
                            height: "55px",
                            fontSize: "1rem",
                            fontWeight: "bold",
                        }}
                    >
                        Iniciar Sesión
                    </button>
                    <p
                        style={{
                            color: "#e0e0e0",
                            fontSize: "1rem",
                            textAlign: "center",
                            marginTop: "1rem",
                        }}
                    >
                        ¿No tienes cuenta?{" "}
                        <a
                            href="/registro_fan"
                            style={{
                                color: "#6a11cb",
                                textDecoration: "none",
                                fontWeight: "bold",
                            }}
                        >
                            Crea una aquí
                        </a>
                    </p>
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
                    overflow: "hidden",
                    marginLeft: "120px",
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
