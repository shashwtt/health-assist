/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { RemoveCurtain } from "@/components/curtain/Curtain";
import Image from "next/image";

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

	return (
		<>
			<Head>
				<title>BrainByte — Learn with AI</title>
			</Head>

			<main id="homePage" className={styles.main}>
				<div className={styles.inner}>
					<section>
						<div className={styles.landerText}>
							<h1>31 May —</h1>
							<h1>World No Tobacco Day</h1>
						</div>
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
					</section>
				</div>
			</main>
		</>
	);
};

export default Home;
