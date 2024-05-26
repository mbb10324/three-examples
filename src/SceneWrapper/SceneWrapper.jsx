import { useEffect, useState } from "react";
import "./SceneWrapper.css";
import { useNavigate } from "react-router-dom";

export default function SceneWrapper({ children }) {
	const [delay, setDelay] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			setDelay(true);
		}, 1600);
	}, []);

	return (
		<div className="splash-container">
			{children}
			<div className={`${delay ? "fade-in" : "hidden"} continue-button`} onClick={() => navigate("/")}>
				&larr;
			</div>
		</div>
	);
}
