import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/header/Header";
import Lenis from "@studio-freight/lenis";
import Footer from "@/components/footer/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <div className="bg"></div>
      <div id="appWrapper">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </React.StrictMode>
  );
}
