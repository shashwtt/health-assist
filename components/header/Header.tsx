import { useState, useRef, useEffect } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";

var isAnimating = false;

function openMenuAnimate() {
	isAnimating = true;
	const btn = document.querySelector(`#menuBtn`) as HTMLDivElement;
	btn.classList.add(styles.active);
	gsap.set(`.${styles.menuItem} h2`, { x: 20, opacity: 0 });
	gsap.set(`.${styles.menuContainer}`, {
		top: btn.offsetTop,
		right: window.innerWidth - btn.offsetLeft - btn.offsetWidth,
		scale: 0.4,
		display: "flex",
		borderTopRightRadius: "12px",
	});
	gsap.to(`.${styles.menuContainer}`, {
		opacity: 1,
		scale: 1,
		duration: 0.4,
		y: -6,
		x: 6,
		delay: 0.2,
	});
	gsap.to(`.${styles.menuItem} h2`, {
		x: 0,
		opacity: 1,
		duration: 0.2,
		stagger: 0.1,
		delay: 0.3,
		onComplete: () => {
			isAnimating = false;
		}
	});
}

function closeMenuAnimate() {
	isAnimating = true;
	const btn = document.querySelector(`#menuBtn`) as HTMLDivElement;
	gsap.to(`.${styles.menuItem} h2`, {
		x: 20,
		opacity: 0,
		duration: 0.07,
		stagger: 0.1,
	});
	gsap.to(`.${styles.menuContainer}`, {
		duration: 0.4,
		delay: 0.1,
		borderTopRightRadius: "6px",
	});
	gsap.to(`.${styles.menuContainer}`, {
		opacity: 0,
		duration: 0.6,
		delay: 0.4,
		onStart: () => {
			btn.classList.remove(styles.active);
		},
	});
	gsap.set(`.${styles.menuContainer}`, {
		display: "none",
		delay: 1,
		onComplete: () => {
			isAnimating = false;
		}
	});
}

function ReturnHeaderLane() {
	return document.querySelector(`.${styles.headerLane}`);
}

function Header() {
	const [menuActive, setMenuActive] = useState(false);
	function __menuCallback() {
		if (isAnimating) return;
		if (menuActive) closeMenuAnimate();
		else openMenuAnimate();
		setMenuActive(!menuActive);
	}

	useEffect(() => {
	}, []);

	return (
		<div className={styles.header}>
			<div className={styles.inner}>
				<h2 className={styles.logo}>NTB.</h2>
				<div className={styles.line}></div>
				<div className={styles.menuBtn} id="menuBtn" onClick={__menuCallback}>
					<div className={styles.menuIcon}>
						<span></span>
						<span></span>
					</div>
					<h2>MENU</h2>
				</div>
			</div>

			<div className={styles.menuContainer}>
				<div className={styles.menuItems}>
					<div className={styles.menuShade}></div>
					<div className={styles.menuItem}>
						<h2>Home</h2>
					</div>
					<div className={styles.menuItem}>
						<h2>About</h2>
					</div>
					<div className={styles.menuItem}>
						<h2>support</h2>
					</div>
					<div className={styles.menuItem}>
						<h2>contribute</h2>
					</div>
				</div>
				<div className={styles.menuFooter}></div>
			</div>

			<div className={styles.headerLane}></div>
		</div>
	);
}

export default Header;
export {ReturnHeaderLane};