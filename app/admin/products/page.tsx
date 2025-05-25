import React from 'react'
import styles from "./styles.module.css"
import Image from 'next/image';
import { del } from '@/app/actions/products';
interface TCategory {
    _id: string,
    title: string
}
interface TProduct {
    title: string,
    Gender: string,
    image: string,
    _id: string,
    category: string
}
const fetchData = async () => {
    const res = await fetch("http://localhost:3000/api/products");
    if (!res.ok) return
    return res.json()
}
const fetchCategories = async () => {
    const res = await fetch("http://localhost:3000/api/categories", { cache: "no-store" })
    if (!res.ok) return
    return res.json()
}

async function Products() {
    const products = await fetchData()
    const categories = await fetchCategories()
    const checkCategory = (id: string): string | null => {
        const found = categories.find((el: TCategory) => el._id === id);
        return found ? found.title : null;
    }
    return (
        <div className={styles.products}>
            <h1>PRODUCTS</h1>
            <table className={styles.items}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>IMAGE</th>
                        <th>TITLE</th>
                        <th>CATEGORY</th>
                        <th>GENDER</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                {
                    products.map((product: TProduct, i: number) => (
                        <tbody key={i}>
                            <tr>
                                <td>{i + 1}</td>
                                <td> <Image src={product.image} alt="asd" width={30} height={30} /></td>
                                <td>{product.title}</td>
                                <td>{checkCategory(product.category)}</td>
                                <td>{product.Gender}</td>
                                <td className={styles.action}>
                                    <form action={del.bind(null , product._id)}>
                                        <button type='submit'>DELETE</button>
                                    </form>
                                    <button>EDIT</button>
                                </td>
                            </tr>
                        </tbody>
                    ))
                }
            </table>
        </div>
    )
}

export default Products