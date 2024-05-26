import * as THREE from "three";

export const SceneGlowAroundSphere = (scene, planet) => {
	const createGlowMaterial = () => {
		const canvas = document.createElement("canvas");
		canvas.width = 100;
		canvas.height = 100;

		const context = canvas.getContext("2d");
		const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);

		gradient.addColorStop(0.1, "rgba(255, 255, 240, 0.9)");
		gradient.addColorStop(0.3, "rgba(249, 246, 223, 0.5)");
		gradient.addColorStop(0.7, "rgba(20, 20, 20, 0)");
		gradient.addColorStop(1, "rgba(20, 20, 20, 0)");

		context.fillStyle = gradient;
		context.fillRect(0, 0, canvas.width, canvas.height);

		const texture = new THREE.CanvasTexture(canvas);

		return new THREE.SpriteMaterial({
			map: texture,
			blending: THREE.AdditiveBlending,
			transparent: true,
		});
	};

	const glowSprite = new THREE.Sprite(createGlowMaterial());
	glowSprite.position.set(planet.position.x, planet.position.y, planet.position.z);
	glowSprite.scale.set(18, 18, 1);
	scene.add(glowSprite);
};
