/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { RemoveCurtain } from "@/components/curtain/Curtain";
import Image from "next/image";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

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
		gsap.to(`.${styles.scrollHint}`, {
			scrollTrigger: {
				trigger: tBar,
				start: "top " + tBar.offsetTop,
				end: "top " + (tBar.offsetTop - 60),
				scrub: true,
			},
			opacity: 0,	
		});
		gsap.to(`.${styles.sec1} .${styles.sinner}`, {
			scrollTrigger: {
				trigger: tBar,
				start: "top " + tBar.offsetTop,
				end: "top 60",
				scrub: true,
			},
			translateY: tBar.offsetTop/3 
		})
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
							<div className={styles.scrollHint}>
								(TRY SCROLLING)
							</div>
						</div>
						<div className={styles.sinner}>
							<div className={styles.landerImg}>
								<Image
									src="/img/tobacco.jpg"
									alt="tobacco"
									className={styles.tobaccoImg}
									width={640}
									height={360}
									priority
								/>
							</div>
							<div className={styles.landerText}>
								<h1>Tobacco,</h1>
								<h1>It fuckin kills you!</h1>
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
