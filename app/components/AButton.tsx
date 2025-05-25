"use client"
import { useFormStatus } from "react-dom"
import styles from "./styles.module.css"


function AButton({title} : {title : string}) {
    const {pending} =useFormStatus()

  return (
    <button className={styles.aButton} type="submit" disabled={pending} >{title}</button>
  )
}

export default AButton