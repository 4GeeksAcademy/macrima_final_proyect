import React from "react";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="h-100 d-flex flex-column justify-content-end">
      <footer
        style={{
          background: "linear-gradient(135deg, #6a11cb, #2575fc)",
          padding: "1.5rem",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          color: "white",
          borderTop: "2px solid #ffffff",
        }}
        className="footer mt-auto"
      >
        <div className="container text-center">
          {/* Encabezado actualizado */}
          <h5
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              marginBottom: "1rem",
            }}
          >
            ¿Quieres saber más sobre los creadores de Macrima?
          </h5>

          {/* Botón principal más llamativo */}
          <button
            style={{
              background: "linear-gradient(90deg, #8e44ad, #6a11cb)",
              border: "none",
              color: "white",
              fontSize: "1rem",
              fontWeight: "600",
              padding: "0.6rem 1.5rem",
              borderRadius: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              transition: "all 0.3s ease",
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "linear-gradient(90deg, #6a11cb, #2575fc)";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "linear-gradient(90deg, #8e44ad, #6a11cb)";
              e.target.style.transform = "scale(1)";
            }}
            onClick={() => navigate("/about")}
          >
            ¡Haz click aquí!
          </button>

          {/* Enlaces sociales */}
          <div className="mt-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "white",
                margin: "0 15px",
                fontSize: "1.3rem",
                transition: "color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.color = "#FFDB58")}
              onMouseOut={(e) => (e.target.style.color = "white")}
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "white",
                margin: "0 15px",
                fontSize: "1.3rem",
                transition: "color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.color = "#FFDB58")}
              onMouseOut={(e) => (e.target.style.color = "white")}
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "white",
                margin: "0 15px",
                fontSize: "1.3rem",
                transition: "color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.color = "#FFDB58")}
              onMouseOut={(e) => (e.target.style.color = "white")}
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
