import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const LoginArtistaF = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (store.authArtistaFeed) {
            navigate("/feed-artista");
        }
    }, [store.authArtistaFeed, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData({
            ...data,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await actions.loginArtistaFeed(data.email, data.password);
        if (success) {
            try {
                const artistData = await actions.getSingleArtistProtected();
                if (artistData && artistData.logged) {
                    const { username, address } = artistData.logged;

                    if (!username || !address) {
                        navigate("/editar-artista");
                    } else {
                        navigate("/feed-artista");
                    }
                } else {
                    console.log("No se pudieron cargar los datos del artista.");
                }
            } catch (error) {
                console.error("Error al verificar los datos del artista:", error);
            }
        } else {
            console.log("Email o contraseña incorrectos.");
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
                            Bienvenido!
                        </h2>
                        <label
                            htmlFor="email"
                            className="form-label fs-base"
                            style={{
                                color: "#e0e0e0",
                                fontSize: "1rem",
                            }}
                        >
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={data.email}
                            onChange={handleChange}
                            id="email"
                            placeholder="Ingresa tu correo electrónico"
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
                            Contraseña
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
                        href="/inicio-artista"
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
                    src="https://res.cloudinary.com/dciy2gw7z/image/upload/v1744707467/m2gscmbv7vvw1rrakllq.png"
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

export default LoginArtistaF;
