/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import styles from "@/styles/Test.module.css";
import Head from "next/head";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { LoadingEnd } from "@/components/header/Header";

const Test = () => {
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

	function CheckBtn(e: any) {
		const btn = e.currentTarget as HTMLDivElement;
		const input = btn.querySelector("input") as HTMLInputElement;
		var value = 0;
		if (input.checked) {
			input.checked = false;
			const x = input.dataset.score;
			if (x) value = score - parseInt(x);
		} else {
			input.checked = true;
			const x = input.dataset.score;
			if (x) value = score + parseInt(x);
		}

		setScore(value);
		evalScore(value);
	}

	const [score, setScore] = React.useState(0);
	const [risk, setRisk] = React.useState(3);
	const [status, setStatus] = React.useState("Low");
	const [color, setColor] = React.useState("#00ff00");

	function evalScore(points: number) {
		var riskPercent = 0;
		if (points == 0) riskPercent = 3;
		else if (points == 2) riskPercent = 6;
		else if (points == 3) riskPercent = 8;
		else if (points == 4) riskPercent = 11;
		else if (points == 5) riskPercent = 15;
		else if (points == 6) riskPercent = 19;
		else if (points == 7) riskPercent = 25;
		else if (points == 8) riskPercent = 32;
		else if (points == 9) riskPercent = 40;
		else if (points == 10) riskPercent = 49;
		else if (points == 11) riskPercent = 58;
		else if (points == 12) riskPercent = 66;
		else if (points == 14) riskPercent = 79;

		setRisk(riskPercent);

		if (riskPercent < 12) setStatus("Low");
		else if (riskPercent < 33) setStatus("Moderate");
		else setStatus("High");

		if (riskPercent < 12) setColor("#00ff00");
		else if (riskPercent < 33) setColor("#ffff00");
		else setColor("#ff0000");

		console.log(riskPercent);
		console.log(status);
		console.log(color);
		console.log(score);
		console.log("_________________________");
	}

	return (
		<>
			<Head>
				<title>Predict Risk of Asthma</title>
			</Head>

			<main id="pars" className={styles.main}>
				<div className={styles.explain}>
					<h1>Let's conduct a test.</h1>
					<h4>
						We will ask you about 6 questions to determine your risk of asthma.
						Please answer them honestly to get the most accurate results. This
						test is based on real research - PARS (Pediatric Asthma Risk Score)
						test and is expected to be 93% accurate.
					</h4>
					<h4>
						Your score will range from 0 - 14 and depending on these factors the
						risk of asthma will be determined. The higher the score, the higher
						the risk. It is also important to note that this test is not a
						diagnosis and is only meant to be used as a guide. If you have any
						concerns, please consult your doctor.
					</h4>
				</div>
				<div className={styles.test}>
					<div>
						<h2>Questions —</h2>
						<div className={styles.questions}>
							<div className={styles.question}>
								<h1>
									<span>1</span> Has either of child's parents had asthma?
								</h1>
								<div className={styles.btn} onClick={CheckBtn}>
									<input type="checkbox" data-score={2} />
									<div className={styles.knobs}></div>
								</div>
							</div>
							<div className={styles.question}>
								<h1>
									<span>2</span> Did the child have eczema between 0-3 years?
								</h1>
								<div className={styles.btn} onClick={CheckBtn}>
									<input type="checkbox" data-score={2} />
									<div className={styles.knobs}></div>
								</div>
							</div>
							<div className={styles.question}>
								<h1>
									<span>3</span> From birth to age 3 years, did the child ever
									wheeze?
								</h1>
								<div className={styles.btn} onClick={CheckBtn}>
									<input type="checkbox" data-score={3} />
									<div className={styles.knobs}></div>
								</div>
							</div>
							<div className={styles.question}>
								<h1>
									<span>4</span> Did the child ever wheeze when not sick?
								</h1>
								<div className={styles.btn} onClick={CheckBtn}>
									<input type="checkbox" data-score={3} />
									<div className={styles.knobs}></div>
								</div>
							</div>
							<div className={styles.question}>
								<h1>
									<span>5</span> Is the child or either of his/her parents of
									black/African ancestry?
								</h1>
								<div className={styles.btn} onClick={CheckBtn}>
									<input type="checkbox" data-score={2} />
									<div className={styles.knobs}></div>
								</div>
							</div>
							<div className={styles.question}>
								<h1>
									<span>6</span> Has the child ever had allergy skin testing
									(skin prick testing) and was allergic to 2 or more things?
								</h1>
								<div className={styles.btn} onClick={CheckBtn}>
									<input type="checkbox" data-score={2} />
									<div className={styles.knobs}></div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<h2>Results —</h2>
						<div className={styles.result}>
							<div
								className={styles.resultColor}
								style={{ background: color }}
							></div>
							<h2>{status} Risk!</h2>
							<h3>
								The child has a {risk}% chance of getting asthma in future.{" "}
							</h3>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Test;
