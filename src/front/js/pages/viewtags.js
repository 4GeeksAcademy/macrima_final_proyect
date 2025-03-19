import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Tagss from "../component/tagss";
import { useNavigate } from "react-router-dom";

export const TagsPage = () => {
    const navigate = useNavigate()
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mb-3">
			<Tagss/>
		</div>
	);
};