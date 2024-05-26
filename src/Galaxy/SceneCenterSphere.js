import * as THREE from "three";

export const SceneCenterSphere = (scene, manager, cracksImg) => {
	const planetGeometry = new THREE.SphereGeometry(5, 32, 32);
	const textureLoader = new THREE.TextureLoader(manager);
	const planetTexture = textureLoader.load(cracksImg);
	const cracksTexture = textureLoader.load(cracksImg);

	const planetMaterial = new THREE.MeshPhongMaterial({
		map: planetTexture,
		emissiveMap: cracksTexture,
		emissive: new THREE.Color("#04c748"),
		emissiveIntensity: 1,
		displacementMap: cracksTexture,
		displacementScale: 10,
	});

	const planet = new THREE.Mesh(planetGeometry, planetMaterial);
	planet.renderOrder = 1;
	scene.add(planet);

	return { planetMaterial, planet };
};
