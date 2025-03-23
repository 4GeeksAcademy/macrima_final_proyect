import React, { useState, useContext } from "react"; 
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Followers = () => {
    const navigate = useNavigate();
    const { actions, store } = useContext(Context);
    const [message, setMessage] = useState("");
    const [dataFollow, setDataFollow] = useState({fan_id:"", artista_id:""})
    const [error, setError] = useState(null)


    const handleBack = () => {
        navigate("/");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataFollow({ ...dataFollow, [name]: value });
    }; 
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { fan_id, artista_id } = dataFollow;

        if (!fan_id || !artista_id) {
            setError("Debes completar ambos IDs");
            setMessage("");
            return;
        }

        try {
             const result = await actions.followArtist(dataFollow);


            if (result) {
                setMessage(`Ahora sigues al artista con ID ${artista_id}`);
                setError(null);
                navigate("/followerView");
            } else {
                setError("Error al seguir al artista. Intenta de nuevo.");
                setMessage("");
            }
        } catch (err) {
            console.error(err);
            setError("Error en el servidor. Intenta más tarde.");
            setMessage("");
        }
    };

    return (
        <div className="container mt-4">
                    <h2>Seguir / Dejar de seguir a un Artista</h2>
            <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="fan_id" className="form-label">Fan ID</label>
                        <input
                            name="fan_id"
                            type="text"
                            className="form-control"
                            id="fan_id"
                            value={dataFollow.fan_id}
                            onChange={handleChange}
                            />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="artista_id" className="form-label">Artista ID</label>
                        <input
                            name="artista_id"
                            type="text"
                            className="form-control"
                            id="artista_id"
                            value={dataFollow.artista_id}
                            onChange={handleChange}
                            />
                    </div>
                <div>

                    <button type="submit" className="btn btn-primary me-2">
                        Seguir Artista
                    </button>

                </div>
            </form>
                    <button onClick={handleBack} className="btn btn-secondary">
                        Volver
                    </button>

                    {message && (
                        <div className="alert alert-info mt-3">
                            {message}
                        </div>
                    )}
        </div>
    );
};

export default Followers;
