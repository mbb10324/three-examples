import * as THREE from "three";

export const SceneManager = (setLoading, setError) => {
	const manager = new THREE.LoadingManager();

	manager.onStart = function () {
		setLoading(true);
	};

	manager.onLoad = function () {
		setLoading(false);
	};

	manager.onError = function () {
		setError(true);
	};

	return manager;
};
