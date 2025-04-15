import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("fanToken");
        localStorage.removeItem("fanData");
        navigate("/registro_fan");
        window.location.reload();
    };

    if (!store.authFan) {
        return null;
    }

    return (
        <>
            {store.accces_token}
            <button type="button" className="btn btn-primary"
                onClick={handleLogout}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Logout
            </button>
        </>
    );
};

export default LogoutButton;
