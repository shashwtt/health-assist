/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { RemoveCurtain } from "@/components/curtain/Curtain";
import Image from "next/image";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { ReturnHeaderLane } from "@/components/header/Header";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
	React.useEffect(() => {
		const handleLoad = () => RemoveCurtain();
		const images = document.querySelectorAll("img");
		let imagesToLoad = images.length;
		const reduceImagesToLoad = () => {
			imagesToLoad--;
			if (imagesToLoad === 0) handleLoad();
		};
		images.forEach((image) => {
			if (image.complete) reduceImagesToLoad();
			else image.addEventListener("load", reduceImagesToLoad);
		});

		return () => {
			images.forEach((image) =>
				image.removeEventListener("load", reduceImagesToLoad)
			);
		};
	}, []);

	useEffect(() => {
		const tBar = document.querySelector(`.${styles.headerLane}`) as HTMLElement;
		const hBar = ReturnHeaderLane();
		gsap.to(`.${styles.scrollHint}`, {
			scrollTrigger: {
				trigger: tBar,
				start: "top " + tBar.offsetTop,
				end: "top " + (tBar.offsetTop - 60),
				scrub: true,
			},
			opacity: 0,
		});
		gsap.to(tBar, {
			duration: 0.01,
			scrollTrigger: {
				trigger: tBar,
				start: "bottom 60",
				end: "bottom 60",
				scrub: true,
			},
			opacity: 0,
		});
		gsap.to(hBar, {
			duration: 0.01,
			scrollTrigger: {
				trigger: tBar,
				start: "bottom 60",
				end: "bottom 60",
				scrub: true,
			},
			opacity: 0.2,
		});
	});

	return (
		<>
			<Head>
				<title>NTB.</title>
			</Head>

			<main id="homePage" className={styles.main}>
				<div className={styles.inner}>
					<section className={styles.sec1}>
						<div className={styles.headerLane}>
							<hr />
							<div className={styles.scrollHint}>(TRY SCROLLING)</div>
						</div>
						<div className={styles.sinner}>
							<Image
								src="/img/tobacco.jpg"
								alt="tobacco"
								className={styles.tobaccoImg}
								width={640}
								height={360}
								priority
							/>
							<div className={styles.landerText}>
								<h2>
								*
								</h2>
								<div>
									<h1>Stop Tobacco,</h1>
									<h1>It Kills you from within!</h1>
								</div>
								<h3>
									Take control of your health and break free from tobacco
									addiction. Choose life and make a commitment to quit smoking
									today. Your well-being matters, and together, we can overcome
									the deadly grip of tobacco.
								</h3>
							</div>
						</div>
					</section>
					<section className={styles.sec2}></section>
				</div>
			</main>
		</>
	);
};

export default Home;
