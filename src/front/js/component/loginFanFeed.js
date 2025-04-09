import React, { useState, useContext, useEffect } from "react"
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


const FanLoginFeed = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: "",
        password: ""
    })
    useEffect(() => {
        if (store.authFanFeed) {
            navigate("/fan/feed");
        }

    }, [store.authFanFeed]);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();


        const success = await actions.loginFanFeed(data.username, data.password);
        if (success) {
            navigate("/fan/feed");
        } else {
            console.log("bad username or passsword");
        }
    };
    
    return<> <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" name="username" className="form-control" value={data.username} onChange={handleChange} id="username" />

        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" value={data.password} className="form-control" onChange={handleChange} id="password" />
        </div>


        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    
    </>                     

}
export default FanLoginFeed