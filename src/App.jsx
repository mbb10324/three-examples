import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SceneWrapper from "./SceneWrapper/SceneWrapper";
import Galaxy from "./Galaxy/Galaxy";
import Smoke from "./Galaxy/Smoke";
import Home from "./Home/Home";

export default function App() {
	return (
		<>
			<Router basename="/three">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/galaxy"
						element={
							<SceneWrapper>
								<Galaxy />
							</SceneWrapper>
						}
					/>
					<Route
						path="/smoke"
						element={
							<SceneWrapper>
								<Smoke />
							</SceneWrapper>
						}
					/>
				</Routes>
			</Router>
		</>
	);
}
