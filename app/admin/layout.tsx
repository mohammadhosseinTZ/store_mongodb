import React, { ReactNode } from "react"
import styles from "./styles.module.css"
import Link from "next/link";
function layout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="container">
            <div className={styles.adminLayout}>

                {children}
            </div>
        </div>
    )
}

export default layout