/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { ReturnHeaderLane } from "@/components/header/Header";
import { LoadingEnd } from "@/components/header/Header";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
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
		const tBar = document.querySelector(`.${styles.headerLane}`) as HTMLElement;
		gsap.set(`.${styles.asterisk}`, { rotate: 500 });
		gsap.set(`.${styles.fakeLane}`, {
			height: window.innerHeight - (tBar.offsetHeight - 2),
			scaleY: 0,
			transformOrigin: "bottom",
		});
		gsap.to(`.${styles.fakeLane}`, {
			duration: 1.4,
			ease: "power4.in",
			scaleY: 1,
			onComplete: () => {
				gsap.to(`.${styles.main}`, {
					opacity: 1,
					duration: 0.5,
				});
				gsap.to(`.${styles.asterisk}`, {
					rotate: 0,
					duration: 2,
					delay: 1.3,
				});
				gsap.set(`.${styles.fakeLane}`, {
					top: tBar.offsetHeight - 2,
					bottom: "unset",
					transformOrigin: "top",
				});
				gsap.to(`.${styles.fakeLane}`, {
					duration: 1.4,
					scaleY: 0,
					delay: 0.9,
					ease: "power4.inOut",
					onComplete: () => {
						LoadingEnd(() => {
							if (lenisRef.current) lenisRef.current.start();
							gsap.to(`.${styles.scrollHint}`, {
								opacity: 0.8,
								duration: 0.2,
								delay: 0.4,
								onComplete: () => {
									ImgUnTheme("#landingImgCont");
								},
							});
						});
					},
				});
			},
		});
	}

	React.useEffect(() => {
		const handleLoad = () => HandleLoad();
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
	});

	useEffect(() => {
		const imgThemes = document.querySelectorAll("[data-theme]");
		imgThemes.forEach((img: any) => {
			const theme = img.getAttribute("data-theme");
			if (theme) img.style.setProperty("--imgTheme", theme);
		});

		const tBar = document.querySelector(`.${styles.headerLane}`) as HTMLElement;
		const hBar = ReturnHeaderLane();
		const hint = document.querySelector(`.${styles.scrollHint}`) as HTMLElement;
		gsap.to(hint, {
			scrollTrigger: {
				trigger: hint,
				start: "top " + hint.offsetTop,
				end: "top " + (hint.offsetTop - 60),
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

		const sinner = document.querySelector(`.${styles.sinner}`) as HTMLElement;
		gsap.to(sinner, {
			scrollTrigger: {
				trigger: sinner,
				start: "top " + sinner.offsetTop,
				end: "bottom top",
				scrub: true,
			},
			y: 200,
			ease: "power0",
		});

		const themeTrigger1 = ScrollTrigger.create({
			trigger: tBar,
			start: "bottom top+=60",
			end: "bottom top",
			onEnter: () => changeTheme(themes.asthma),
			onLeaveBack: () => changeTheme(themes.default),
		});

		const asterisk = document.querySelector(
			`.${styles.asterisk}`
		) as HTMLElement;
		if (asterisk) {
			gsap.to(asterisk, {
				scrollTrigger: {
					trigger: asterisk,
					start: "top 50%",
					end: "bottom top",
					scrub: true,
				},
				ease: "power0",
				rotate: -100,
			});
		}

		return () => {
			themeTrigger1.kill();
		};
	});

	function ImgUnTheme(imgSelector: string) {
		const img = document.querySelector(imgSelector) as HTMLElement;
		img.classList.add(styles.imgLoaded);
	}

	function changeTheme(colors: { [key: string]: string }) {
		console.log("setting new theme, colors: ", colors);
		gsap.to(":root", { ...colors, duration: 0.3 });
	}

	const themes = {
		default: {
			"--primary": "#e9e9e9",
			"--menu": "#222",
			"--text": "#111",
			"--popup": "#eee",
		},
		asthma: {
			"--primary": "#DEE2E9",
			"--menu": "#222",
			"--text": "#111",
			"--popup": "#edf0f5",
		},
	};

	useEffect(() => {
		gsap.set(`.${styles.sec2} .${styles.content}`, {
			scale: 0.9,
			opacity: 0.4,
			y: 200,
		});
		gsap.to(`.${styles.sec2} .${styles.content}`, {
			scrollTrigger: {
				trigger: `.${styles.sec2}`,
				start: "top bottom",
				end: "top bottom-=400",
				scrub: true,
			},
			y: -50,
			opacity: 1,
			scale: 1,
			duration: 0.4,
		})
	}, []);

	return (
		<>
			<Head>
				<title>NTB.</title>
			</Head>

			<div className={styles.fakeLane}></div>

			<main id="homePage" className={styles.main}>
				<div className={styles.inner}>
					<section className={styles.sec1}>
						<div className={styles.headerLane}>
							<hr />
							<div className={styles.scrollHint}>(TRY SCROLLING)</div>
						</div>
						<div className={styles.sinner}>
							<div
								className={styles.imgElm}
								id="landingImgCont"
								data-theme="#b6b5aF"
							>
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
								<div className={styles.asterisk}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="800px"
										height="800px"
										viewBox="-1 0 24 24"
										className={styles.asteriskSvg}
									>
										<path d="m21.416 15.661-6.666-3.661 6.666-3.661c.35-.195.584-.563.584-.986 0-.207-.056-.401-.154-.568l.003.005-.913-1.584c-.198-.339-.56-.563-.974-.563-.216 0-.417.061-.588.166l.005-.003-6.503 3.943.163-7.603c0-.007 0-.014 0-.022 0-.621-.503-1.125-1.124-1.125h-1.826c-.621 0-1.125.504-1.125 1.125v.025-.001l.163 7.603-6.504-3.942c-.166-.102-.368-.163-.583-.163-.414 0-.776.224-.971.557l-.003.005-.913 1.581c-.095.161-.151.356-.151.563 0 .423.233.791.578.983l.006.003 6.666 3.661-6.666 3.661c-.35.195-.584.563-.584.986 0 .207.056.401.154.568l-.003-.005.913 1.582c.198.339.56.563.974.563.216 0 .417-.061.588-.166l-.005.003 6.503-3.943-.163 7.603v.024c0 .621.504 1.125 1.125 1.125h1.826c.621 0 1.125-.504 1.125-1.125 0-.009 0-.017 0-.025v.001l-.163-7.603 6.503 3.943c.166.102.368.163.583.163.414 0 .776-.224.971-.557l.003-.005.913-1.582c.095-.161.151-.356.151-.563 0-.423-.233-.791-.578-.983l-.006-.003z" />
									</svg>
								</div>
								<div>
									<h1>About 1 in 10 people,</h1>
									<h1>suffer from asthma disease!</h1>
								</div>
								<h3>
									Day by day, the number of people suffering from asthma is
									increasing. It is a very common disease yet unknown to many.
									This website is an attempt to spread awareness about asthma
									and its causes while also helping you to achieve a better
									health and future safety from asthma.
									<br />
									Let's learn more about it!
								</h3>
							</div>
						</div>
					</section>
					<section className={styles.sec2}>
						<div className={styles.content}>
							<div className={styles.topicTitle}>
								So, What exactly is asthma?
							</div>
							<div className={styles.topicText}>
								Asthma is a condition in which your airways narrow and swell and
								may produce extra mucus. This can make breathing difficult and
								trigger coughing, a whistling sound (wheezing) when you breathe
								out and shortness of breath. For some people, asthma is a minor
								nuisance. For others, it can be a major problem that interferes
								with daily activities and may also lead to a life-threatening asthma
								attack. It can happen to anyone and is a pretty common disease!
							</div>
							<div className={styles.dimgElm} id="diagramImgCont">
								<Image
									src="/img/th.jpg"
									alt="asthma diagram"
									width={350}
									height={350}
									quality={100}
									priority
									className={styles.diagramImg}
								/>
							</div>
						</div>
					</section>
				</div>
			</main>
		</>
	);
};

export default Home;
