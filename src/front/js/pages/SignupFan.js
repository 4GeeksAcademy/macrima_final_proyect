import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";



const SignupFan = () => {

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
            navigate("/login_fan"); 
        } else {
            setError("Error creating fan. Please try again.");
        }
    };

    return (

        <>
            <Link to="/login_fan">
                <button className="btn btn-success">Ya tengo cuenta </button>
            </Link>
            <   div className="text-center mt-4 mb-3">
                    <h2>Registro de Fan</h2>
                </div>
         <div className="container mt-4 d-flex justify-content-center">
    <div className="w-50">
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Username</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea 
                    className="form-control" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">Avatar URL</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="avatar" 
                    value={formData.avatar} 
                    onChange={handleChange} 
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">Create Fan</button>
        </form>
    </div>
</div>
    
        </>
    )
}

export default SignupFan; 