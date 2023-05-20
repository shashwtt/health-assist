import styles from "./Mist.module.css";
import React from "react";
import { gsap } from "gsap";

var direction_ = "right";

function ThrowCurtain(CurtainThrown: any) {
	// const curtain = document.querySelector("." + styles.curtain) as HTMLElement;
	// if (curtain) {
	// 	gsap.set(curtain, { scaleX: 0.3, visibility: "initial" });
	// 	gsap.set(curtain, { x: "-100vw", transformOrigin: "top" });
	// }
	// gsap.to(curtain, {
	// 	duration: 0.6,
	// 	transform: "translateX(0)",
	// 	scale: 1,
	// 	ease: "power2.in",
	// 	onComplete: () => {
	// 		const waiter = document.querySelector("." + styles.waiter);
	// 		gsap.set(waiter, { opacity: 0.7 });
	// 		CurtainThrown();
	// 	},
	// });
}

function RemoveMist() {
	const curtain = document.querySelector("." + styles.curtain) as HTMLElement;
	var y = "translateY(-100vh)";
	gsap.to(curtain, {
		delay: 1.2,
		duration: 0.8,
		ease: "power4.in",
		transform: y,
		// scaleX: 0.2,
		onComplete: () => {
			if (curtain) {
				gsap.set(curtain, { visibility: "hidden" });
        gsap.set(curtain, { y: "-100vh", scaleY: 1 });
			}
		},
	});
}

function Mist() {
	return (
		<div className={styles.mist}>
		</div>
	);
}

export default Mist;
export { ThrowCurtain, RemoveMist as RemoveCurtain };
