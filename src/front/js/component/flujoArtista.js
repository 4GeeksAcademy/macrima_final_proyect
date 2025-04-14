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

    const handleBack = () => {
        navigate("/loginF-artista");
    };

    return (
        <div
            className="register-container d-flex"
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
                        }}
                    >
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" style={{ color: "#e0e0e0" }}>
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
                        Registrar Artista
                    </button>
                </form>
                <p
                    className="mt-3 text-center"
                    style={{
                        color: "#ffffff",
                        fontSize: "1rem",
                    }}
                >
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                        to="/loginF-artista"
                        style={{
                            color: "#6a11cb",
                            textDecoration: "underline",
                            fontWeight: "bold",
                        }}
                    >
                        Inicia sesión aquí.
                    </Link>
                </p>
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
                    src="https://res.cloudinary.com/dciy2gw7z/image/upload/v1744602209/xju6myacxrsn53tpuglp.png"
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
