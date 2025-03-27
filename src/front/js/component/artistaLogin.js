import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const ArtistaLogin = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (store.authArtista) {
            navigate("/artista/dashboard");
        }
    }, [store.authArtista]);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await actions.loginArtista(data.email, data.password);
        if (success) {
            navigate("/artista/dashboard");
        } else {
            console.log("Email o contraseña incorrectos");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={data.email}
                    onChange={handleChange}
                    id="email"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    name="password"
                    value={data.password}
                    className="form-control"
                    onChange={handleChange}
                    id="password"
                />
            </div>
            <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
        </form>
    );
};

export default ArtistaLogin;
