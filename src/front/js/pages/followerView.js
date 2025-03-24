import React, { useState, useContext } from "react"; 
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Followers from "./followers";
import ListFollowers from "./listFollowers";

const ViewFollower = () => {
    return (
        <>
        <ListFollowers/>
        </>
    )
}

export default ViewFollower