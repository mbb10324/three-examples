import { useNavigate } from "react-router-dom";
import smoke from "../assets/smoke_screenshot.png";
import galaxy from "../assets/galaxy_screenshot.png";
import "./Home.css";

export default function Home() {
	const navigate = useNavigate();
	return (
		<div className="home-container">
			<h1>Three.js Examples</h1>
			<div className="btn-wrapper">
				<div className="btn-img" onClick={() => navigate("/smoke")}>
					<img src={smoke} alt="smoke" />
					<h2>Smoke Scene</h2>
				</div>
				<div className="btn-img" onClick={() => navigate("/galaxy")}>
					<img src={galaxy} alt="galaxy" />
					<h2>Moon Scene</h2>
				</div>
			</div>
		</div>
	);
}
