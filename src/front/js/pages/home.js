import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import WallpapersHome from "./WallpapersHome";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mb-3">
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} alt="Rigo Baby" />
      </p>
    </div>
  );
};