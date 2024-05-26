import * as THREE from "three";

export const SceneStars = (scene, stars) => {
	/* Create stars
	 *********************************************************************************************/
	const createStarGlowMaterial = () => {
		const canvas = document.createElement("canvas");
		canvas.width = 200;
		canvas.height = 200;

		const context = canvas.getContext("2d");
		const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);

		gradient.addColorStop(0.1, "rgba(255, 255, 240, 0.9)");
		gradient.addColorStop(0.3, "rgba(249, 246, 223, 0.5)");
		gradient.addColorStop(0.7, "rgba(249, 246, 223, 0.2)");
		gradient.addColorStop(1, "rgba(4, 199, 72, 0)");

		context.fillStyle = gradient;
		context.fillRect(0, 0, canvas.width, canvas.height);

		const texture = new THREE.CanvasTexture(canvas);

		return new THREE.SpriteMaterial({
			map: texture,
			blending: THREE.AdditiveBlending,
			transparent: true,
		});
	};

	const starMaterial = createStarGlowMaterial();
	const numStars = 5000; // Number of stars

	for (let i = 0; i < numStars; i++) {
		const starSprite = new THREE.Sprite(starMaterial);

		const distanceFromPlanet = 200;
		const randomDistance = Math.random() * distanceFromPlanet + 20; // Star postion relative to planet

		const theta = 2 * Math.PI * Math.random();
		const phi = Math.acos(2 * Math.random() - 1);
		const x = randomDistance * Math.sin(phi) * Math.cos(theta);
		const y = randomDistance * Math.sin(phi) * Math.sin(theta);
		const z = randomDistance * Math.cos(phi);

		starSprite.position.set(x, y, z);
		starSprite.scale.set(0.3, 0.3, 1); // Size of the stars

		scene.add(starSprite);
		stars.push(starSprite);
	}
};
