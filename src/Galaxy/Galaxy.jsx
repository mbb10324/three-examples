import { SceneGlowAroundSphere } from "./SceneGlowAroundSphere";
import { SceneCenterSphere } from "./SceneCenterSphere";
import { SceneAnimateStars } from "./SceneAnimateStars";
import { SceneHandleResize } from "./SceneHandleResize";
import cracksImg from "../assets/cracks.png";
import { SceneInitializer } from "./SceneInitializer";
import { useEffect, useRef, useState } from "react";
import useBreakpoints from "../utils/Breakpoint";
import { SceneManager } from "./SceneManager";
import { SceneStars } from "./SceneStars";
import Spinner from "../Loader/Spinner.jsx";
import * as THREE from "three";
import "./Galaxy.css";

export default function Galaxy() {
	const ref = useRef();
	const mobile = useBreakpoints(600);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		//initialize the three js scene
		const { scene, camera, renderer, controls } = SceneInitializer(mobile, ref);
		// initialize the loading manager
		const manager = SceneManager(setLoading, setError);
		// initialize the planet
		const { planetMaterial, planet } = SceneCenterSphere(scene, manager, cracksImg);
		// create the ambient light
		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		scene.add(ambientLight);
		// glow around the planet
		SceneGlowAroundSphere(scene, planet);
		// create the stars
		let stars = [];
		SceneStars(scene, stars);
		// animation variables
		let time = 0;
		const bubblingFrequency = 0.01;
		const bubblingIntensity = 0.1;
		let zoomInDistance = 0;
		// animate the scene
		const animate = () => {
			requestAnimationFrame(animate);

			if (zoomInDistance < 1) {
				zoomInDistance += 0.006;
				const currentZoomDistance = THREE.MathUtils.lerp(controls.maxDistance, controls.minDistance, zoomInDistance);
				camera.position.set(0, 0, currentZoomDistance);
				camera.lookAt(controls.target);
			}

			time += bubblingFrequency;
			planetMaterial.displacementScale = Math.sin(time) * bubblingIntensity;

			planet.rotation.y += 0.002;

			controls.update();

			SceneAnimateStars(stars);

			renderer.render(scene, camera);
		};
		// start the animations
		animate();
		// handle the window resize
		SceneHandleResize(camera, renderer);
		// add the resize event listener
		window.addEventListener("resize", SceneHandleResize);

		return () => {
			// remove the event listener
			window.removeEventListener("resize", SceneHandleResize);
			// cancel the animations
			cancelAnimationFrame(animate);
			// dispose of the scene
			scene.children.forEach((child) => {
				if (child.material) {
					child.material.dispose();
				}
				if (child.geometry) {
					child.geometry.dispose();
				}
			});
			// remove the canvas from the dom
			if (ref.current && ref.current.contains(renderer.domElement)) {
				//eslint-disable-next-line
				ref.current.removeChild(renderer.domElement);
			}
		};
		//eslint-disable-next-line
	}, [mobile]);

	return (
		<>
			{loading && <Spinner />}
			{error && <p>There was an error loading the galaxy.</p>}
			<div className="canvas-container">
				<div ref={ref} className="canvas-content"></div>
				<div className="background-image" />
				<div className="control-info">
					<p>Zoom in/out</p>
					<p>Rotate the planet</p>
				</div>
			</div>
		</>
	);
}
