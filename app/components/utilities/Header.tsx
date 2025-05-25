import styles from "./styles.module.css"
import Link from "next/link"
import Image from "next/image"
function Header() {
  return (
    <div className={styles.header}>
    <ul className={styles.log}>
      <li className={styles.admin}><Link href="/admin">ADMIN <Image src={"/images/icon/entrance.png"} alt="entrance" width={20} height={20} /></Link></li>

      <li><button > LOGOUT </button></li>
    </ul>
    <ul className={styles.links}>
    <li><Link href="/admin/products"> PRODUCTS </Link></li>
    <li><Link href="/admin/categories">  CATEGORIES </Link></li>
    </ul>
    </div>
  )
}

export default Header