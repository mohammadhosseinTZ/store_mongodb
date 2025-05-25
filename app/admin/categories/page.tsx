
import Link from "next/link";
import styles from "./styles.module.css"
import FormAdd from "@/app/components/categories/FormAdd";
import Table from "@/app/components/categories/Table";
import CategoriesContext from "@/app/components/context/CategoriesContext";


async function Categories() {
    await new Promise((resolve , reject)=> setTimeout(() => {
            resolve("ok") 
    }, 4000))

    return (
        <>
            <CategoriesContext>
                <div className={styles.categories}>
                    <h1>CATEGORIES</h1>
                    <div className={styles.wrapper}>
                        <table className={styles.items}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>CATEGORY</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <Table />
                        </table>
                        <div className={styles.newCat}>
                            <FormAdd />
                        </div>
                    </div>
                </div>
            </CategoriesContext>
        </>
    )
}

export default Categories