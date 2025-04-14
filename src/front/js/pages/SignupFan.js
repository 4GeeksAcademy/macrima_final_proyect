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
      setError("Error creating fan. Please try again.");
    }
  };

  return (
    <div
      className="signup-container d-flex"
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
            }}
          >
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label htmlFor="username" className="form-label" style={{ color: "#e0e0e0" }}>
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
              className="form-control"
              name="password"
              id="password"
              value={formData.password}
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
            Crear Fan
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
            to="/login_fan"
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
