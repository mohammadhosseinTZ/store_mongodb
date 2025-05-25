"use client"
import { createContext, ReactNode, useEffect, useState } from "react"
interface TCategories {
    _id: string,
    title: string,
    createdAt: string,
    updatedAt: string,
}
interface TCategoryContext {
    categories: TCategories[] | undefined;
    setCategories: React.Dispatch<React.SetStateAction<TCategories[] | undefined>>
}

export const CategoriesProvider = createContext<TCategoryContext>({ categories: undefined, setCategories: () => { } })

function CategoriesContext({ children }: { children: ReactNode }) {
    const [categories, setCategories] = useState<TCategories[] | undefined>(undefined)
    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/categories")
                if (!res.ok) return
                const data = await res.json()
                setCategories(data)

            } catch (error: any) {
                return error.message
            }

        }
        fetchData()
    }, [])
    return (
        <CategoriesProvider.Provider value={{ categories, setCategories }}>
            {children}
        </CategoriesProvider.Provider>
    )
}

export default CategoriesContext