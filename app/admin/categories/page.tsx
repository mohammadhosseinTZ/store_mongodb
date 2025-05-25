
import Link from "next/link";
import styles from "./styles.module.css"
import FormAdd from "@/app/components/categories/FormAdd";
import Table from "@/app/components/categories/Table";
interface TCategories {
    _id: string,
    title: string,
    createdAt: string,
    updatedAt: string,
}
const fetchData = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/categories")
        if (!res.ok) return
        return await res.json();

    } catch (error: any) {
        return error.message
    }
}

async function Categories() {
    const resultFetch: TCategories[] | undefined = await fetchData()

    return (
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
                    {resultFetch?.map((category, i) => (
                        <Table key={i} i={i} category={category.title} id={category._id} />
                    ))}
                </table>


                <div className={styles.newCat}>
                    <FormAdd />
                </div>
            </div>
        </div>
    )
}

export default Categories