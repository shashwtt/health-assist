/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import styles from "@/styles/AirTracker.module.css";
import Head from "next/head";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { LoadingEnd } from "@/components/header/Header";

const AirTracker = () => {
	const lenisRef = React.useRef<Lenis | null>(null);
	React.useEffect(() => {
		lenisRef.current = new Lenis({
			duration: 1.4,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		});
		function raf(time: any) {
			if (lenisRef.current) {
				lenisRef.current.raf(time);
				requestAnimationFrame(raf);
			}
		}
		requestAnimationFrame(raf);
		lenisRef.current.stop();
	}, []);

	function HandleLoad() {
		LoadingEnd(() => {
			if (lenisRef.current) lenisRef.current.start();
		});
	}

	React.useEffect(() => {
        HandleLoad();
	});

	return (
		<>
			<Head>
				<title>NTA Air Tracker.</title>
			</Head>

			<main id="airTracker" className={styles.main}>
                
            </main>
		</>
	);
};

export default AirTracker;
