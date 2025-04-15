import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

const SignupFan = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await actions.addFan(formData);
    if (result) {
      navigate("/login_fan");
    } else {
      setError("Error al crear el fan. Por favor intenta nuevamente.");
    }
  };

  return (
    <div
      className="signup-container d-flex"
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
              Regístrate como Fan
            </h2>
            {error && (
              <div
                className="alert alert-danger"
                role="alert"
                style={{
                  backgroundColor: "#ff1744",
                  color: "#fff",
                  border: "none",
                  marginBottom: "1rem",
                  padding: "0.5rem 1rem",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}
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
              className="form-control"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
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
              className="form-control"
              name="password"
              id="password"
              value={formData.password}
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
            Crear Fan
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
              to="/login_fan"
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

export default SignupFan;
