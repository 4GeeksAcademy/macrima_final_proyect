import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

const RegistraArtista = () => {
    const [infoArtista, setInfoArtista] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInfoArtista({
            ...infoArtista,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newArtista = {
                email: infoArtista.email,
                password: infoArtista.password,
            };

            const response = await actions.createLocatedArtista(newArtista);
            if (response) {
                setMessage("Artista creado con éxito");
                setIsError(false);
                setInfoArtista({ email: "", password: "" });

                setTimeout(() => {
                    navigate("/loginF-artista");
                }, 1500);
            } else {
                setMessage("Ocurrió un error al registrar al artista");
                setIsError(true);
            }
        } catch (error) {
            console.error("Error al crear artista:", error);
            setMessage("Error inesperado al crear el artista");
            setIsError(true);
        }
    };

    return (
        <div
            className="register-container d-flex"
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
                            Regístrate como Artista
                        </h2>
                        {message && (
                            <div
                                className={`alert ${isError ? "alert-danger" : "alert-success"}`}
                                role="alert"
                                style={{
                                    backgroundColor: isError ? "#ff1744" : "#00c853",
                                    color: "#fff",
                                    border: "none",
                                    marginBottom: "1rem",
                                    padding: "0.5rem 1rem",
                                    textAlign: "center",
                                }}
                            >
                                {message}
                            </div>
                        )}
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
                            id="email"
                            className="form-control"
                            value={infoArtista.email}
                            onChange={handleChange}
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
                            id="password"
                            className="form-control"
                            value={infoArtista.password}
                            onChange={handleChange}
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
                        Registrar Artista
                    </button>
                    <p
                        style={{
                            color: "#e0e0e0",
                            fontSize: "1rem",
                            textAlign: "center",
                            marginTop: "1rem",
                        }}
                    >
                        ¿Ya tienes una cuenta?{" "}
                        <Link
                            to="/loginF-artista"
                            style={{
                                color: "#6a11cb",
                                textDecoration: "none",
                                fontWeight: "bold",
                            }}
                        >
                            Inicia sesión aquí
                        </Link>
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

export default RegistraArtista;
