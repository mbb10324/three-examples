import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const SceneInitializer = (mobile, ref) => {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, transparent: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	if (ref.current) {
		ref.current.appendChild(renderer.domElement);
	}

	camera.position.z = mobile ? 20 : 15;

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableZoom = true;
	controls.minDistance = mobile ? 20 : 15;
	controls.maxDistance = 100;
	controls.target.set(0, 0, 0);
	controls.enablePan = false;

	camera.position.set(0, 0, controls.maxDistance);

	return { scene, camera, renderer, controls };
};
