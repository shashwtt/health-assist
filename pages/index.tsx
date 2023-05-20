/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { RemoveCurtain } from "@/components/mist/mist";

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

				</div>
			</main>
		</>
	);
};

export default Home;
