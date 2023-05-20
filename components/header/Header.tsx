import { useState, useRef, useEffect } from "react";
import styles from "./Header.module.css";
import Link from "next/link";

function Header() {
    useEffect(() => {
        console.log("Header mounted");
    }, []);

    return (
        <div className={styles.footer}>

        </div>
    )

}

export default Header;