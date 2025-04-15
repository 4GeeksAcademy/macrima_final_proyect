import React, { useState, useContext } from "react"; 
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const AgregarTag = () => {
    const navigate = useNavigate();
    const { actions } = useContext(Context);
    const [formInfo, setFormInfo] = useState({ name: "" });

    const handleChange = (e) => {
        setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await actions.agregarTags(formInfo);
        if (result) {
            console.log("Tag creado");
            navigate("/tags");
        } else {
            console.log("Tag no creado");
        }
    };

    const handleBack = () => {
        navigate("/tags");
    };

    return (
        <div 
            className="agregar-tag-container"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#121212",
                padding: "2rem",
                color: "#f5f5f5",
            }}
        >
            <form 
                onSubmit={handleSubmit}
                className="form-floating"
                style={{
                    backgroundColor: "#1f1f2f",
                    borderRadius: "10px",
                    padding: "2rem",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                    width: "100%",
                    maxWidth: "400px",
                }}
            >
                <div className="form-group" style={{ marginBottom: "1.5rem" }}>
                    <label 
                        htmlFor="floatingInputValue"
                        style={{
                            color: "#ffffff",
                            fontWeight: "bold",
                            fontSize: "1rem",
                        }}
                    >
                        Nombre de Tag
                    </label>
                    <input
                        onChange={handleChange}
                        name="name"
                        type="text"
                        className="form-control"
                        id="floatingInputValue"
                        value={formInfo.name}
                        style={{
                            backgroundColor: "#1e1e1e",
                            color: "#f5f5f5",
                            border: "1px solid #424242",
                            borderRadius: "5px",
                            padding: "0.75rem",
                            fontSize: "1rem",
                        }}
                        placeholder="Escribe el nombre del tag"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-success"
                    style={{
                        backgroundColor: "#6a11cb", 
                        border: "none",
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        color: "#ffffff",
                        cursor: "pointer",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    Agregar Tag
                </button>
            </form>
            <button
                onClick={handleBack}
                className="btn btn-secondary mt-3"
                style={{
                    backgroundColor: "#3498db", 
                    border: "none",
                    width: "100%",
                    maxWidth: "400px",
                    padding: "0.75rem",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "#ffffff",
                    cursor: "pointer",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                }}
            >
                Volver al menú de botones
            </button>
        </div>
    );
};

export default AgregarTag;
