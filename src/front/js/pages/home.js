import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Tagss from "../component/tagss";
import { useNavigate } from "react-router-dom";


export const Home = () => {
	const navigate = useNavigate()
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mb-3">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl}/>
			</p>
		</div>
	);
};