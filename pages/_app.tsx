import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/header/Header";
import Lenis from "@studio-freight/lenis";
import Footer from "@/components/footer/Footer";
import Mist from "@/components/mist/mist";

export default function App({ Component, pageProps }: AppProps) {
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
  }, []);

  return (
    <React.StrictMode>
      <Mist />
      <div id="appWrapper">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </React.StrictMode>
  );
}
