import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const AddFanForm = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        description: "",
        avatar: ""
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await actions.addFan(formData);
        if (result) {
            navigate("/"); 
        } else {
            setError("Error creating fan. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create Fan Account</h2>
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
                <button type="submit" className="btn btn-primary">Create Fan</button>
            </form>
        </div>
    );
};

export default AddFanForm;
