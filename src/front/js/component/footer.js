import React from "react";

export const Footer = () => (
    <div className="h-100 d-flex flex-column justify-content-end">

    <footer style={{
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        padding: "1rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
    }} className="text-white py-4 footer mt-auto">
        <div className="container text-center">
            <h5 style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1rem"
            }}>
                ¿Quieres saber más sobre nosotros?
            </h5>
            <div className="row justify-content-center">
                <div className="col-4 col-md-3">
                    <a 
                        href="https://github.com/martinSabatini" 
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            color: "white",
                            textDecoration: "none",
                            transition: "color 0.3s ease",
                        }}
                        onMouseOver={(e) => e.target.style.color = "#FFDB58"}
                        onMouseOut={(e) => e.target.style.color = "white"}
                        >
                        Martin Sabatini
                    </a>
                </div>
                <div className="col-4 col-md-3">
                    <a 
                        href="https://github.com/Cgeorge1807" 
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            color: "white",
                            textDecoration: "none",
                            transition: "color 0.3s ease",
                        }}
                        onMouseOver={(e) => e.target.style.color = "#FFDB58"}
                        onMouseOut={(e) => e.target.style.color = "white"}
                        >
                        Christian George
                    </a>
                </div>
                <div className="col-4 col-md-3">
                    <a 
                        href="https://github.com/DwTMolecule" 
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            color: "white",
                            textDecoration: "none",
                            transition: "color 0.3s ease",
                        }}
                        onMouseOver={(e) => e.target.style.color = "#FFDB58"}
                        onMouseOut={(e) => e.target.style.color = "white"}
                        >
                        Matias Sanhueza
                    </a>
                </div>
            </div>
        </div>
    </footer>
    </div>
);
