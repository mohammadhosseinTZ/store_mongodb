"use client"

import Link from "next/link"
import styles from "./styles.module.css"
import { useContext, useEffect, useLayoutEffect, useReducer, useState } from "react"
import { CategoriesProvider } from "../context/CategoriesContext"

interface TCategories {
    _id: string,
    title: string,
    createdAt: string,
    updatedAt: string,
}

function Table() {
    const context = useContext(CategoriesProvider)

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:3000/api/categories?categoryId=${id}`, { method: "DELETE" })
            if (!res.ok) return
            const new_Data = context?.categories?.filter(el => el._id !== id)
            context.setCategories(new_Data)
        } catch (error: any) {
            return error.message;
        }
    }

    return (
        <>
            {context?.categories && context?.categories.map((category: TCategories, i: number) => (
                <tbody className={styles.items} key={i}>
                    <tr  >
                        <td>{i + 1}</td>
                        <td>{category.title} </td>
                        <td>
                            <button className={styles.delete} onClick={() => handleDelete(category._id)}>DELETE</button>
                        </td>
                    </tr>
                </tbody>
            ))
            }
        </>
    )
}

export default Table