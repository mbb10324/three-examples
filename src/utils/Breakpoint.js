import { useEffect, useState } from "react";

export default function useBreakpoints(screenSize) {
	const [breakpoint, setBreakpoint] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 600) {
				setBreakpoint(true);
			} else {
				setBreakpoint(false);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [screenSize]);

	return breakpoint;
}
