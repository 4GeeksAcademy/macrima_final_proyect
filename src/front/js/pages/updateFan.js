import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

const UpdateFanForm = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const { fanId } = useParams();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        description: "",
        avatar: ""
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadFanData = async () => {
            try {
                const data = await actions.getFanById(fanId);
    
                setFormData({
                    username: data.username || "",
                    email: data.email || "",
                    password: "", 
                    description: data.description || "",
                    avatar: data.avatar || ""
                });
            } catch (error) {
                console.error("Error loading fan data:", error);
            }
        };
    
        loadFanData();
    }, [fanId, actions]);
    
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await actions.updateFan(fanId, formData);
        if (result) {
            navigate("/"); 
        } else {
            setError("Error updating fan. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Update Fan Account</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Avatar URL</label>
                    <input type="text" className="form-control" name="avatar" value={formData.avatar} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Update Fan</button>
            </form>
        </div>
    );
};

export default UpdateFanForm;
