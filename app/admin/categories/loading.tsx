import Image from 'next/image'
import React from 'react'
import gif from "@/public/images/icon/chargement.gif"
import styles from "./styles.module.css"
function Loading() {
  return (
    <div className={styles.loading}>
       <Image src={gif} alt="as" height={50} width={50} />
    </div>
  )
}

export default Loading