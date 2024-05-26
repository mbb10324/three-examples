export const SceneAnimateStars = (stars) => {
	for (let star of stars) {
		const dx = (Math.random() - 0.2) * 0.002;
		const dy = (Math.random() - 0.2) * 0.002;
		const dz = (Math.random() - 0.2) * 0.002;

		star.position.x += dx;
		star.position.y += dy;
		star.position.z += dz;

		if (star.position.length() > 120) {
			star.position.setLength(119);
		}
	}
};
