import { useState, useRef, useEffect } from "react";
import styles from "./Footer.module.css";

function Footer() {
    useEffect(() => {
        console.log("Footer mounted");
    }, []);

    return (
        <div className={styles.footer}>

        </div>
    )

}

export default Footer;