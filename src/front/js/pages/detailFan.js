import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const DetailFan = () => {
    const { store, actions } = useContext(Context);
    const { fanId } = useParams(); 
    const [fan, setFan] = useState(null);

    useEffect(() => {
        const fetchFan = async () => {
            const fanData = await actions.getFanById(fanId);
            setFan(fanData);
        };
        fetchFan();
    }, [fanId]);

    if (!fan) return <p>Cargando...</p>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body text-center">
                    <img src={fan.avatar} alt="Avatar" className="rounded-circle mb-3" width="150" />
                    <h2>{fan.username}</h2>
                    <p><strong>Email:</strong> {fan.email}</p>
                    <p><strong>Description:</strong> {fan.description}</p>
                </div>
            </div>
        </div>
    );
};

export default DetailFan;
