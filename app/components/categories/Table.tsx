"use client"

import Link from "next/link"
import styles from "./styles.module.css"
function Table({ i, category , id }: { i: number, category: string, id: string }) {
    const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/categories?categoryId=${id}`)
            if (!res.ok) return
            const data = res.json()
            console.log(data);

        } catch (error: any) {
            return error.message;
        }
    }
    return (
        <tbody  className={styles.items}>
            <tr  >
                <td>{i + 1}</td>
                <td>{category} </td>
                <td>
                    <button onClick={handleDelete}>DELETE</button>
                    <Link href={"/admin/categories"}>EDIT</Link>
                </td>
            </tr>
        </tbody>
    )
}

export default Table