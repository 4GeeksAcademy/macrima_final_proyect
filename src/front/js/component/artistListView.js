import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import ArtistaList from "../component/artistaList";
import { useNavigate } from "react-router-dom";



export const ArtisListView = () => {
	const navigate = useNavigate();
	const handleBackToMenu = () => {
		navigate('/');
	};
	return (
		<div className="text-center mt-5">
			<ArtistaList />
			<button onClick={handleBackToMenu} className="btn btn-secondary mt-3">
				Volver al menú de botones
			</button>
		</div>
	);
};
export default ArtisListView