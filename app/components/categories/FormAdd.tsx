"use client"

import { addCategory } from "@/app/actions/category"
import AButton from "../AButton"
import React, { useContext, useEffect } from "react"
import { CategoriesProvider } from "../context/CategoriesContext"

function FormAdd() {
    const context = useContext(CategoriesProvider)
    const [state, formAction] = React.useActionState(addCategory, { error: '' })
    useEffect(() => {
        if (state.success && state?.data?.category&& context.categories) {

            context.setCategories(prev => [...(prev || []), state.data.category])
        }
    }, [state])


    return (
        <form action={formAction}>
            <label htmlFor="">Add Your New Category.</label>
            <input type="text" name="category" />
            <AButton title="ADD" />
        </form>
    )
}

export default FormAdd