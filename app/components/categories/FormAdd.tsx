"use client"

import { addCategory } from "@/app/actions/category"
import AButton from "../AButton"
import React from "react"

function FormAdd() {
    const [state , formAction] = React.useActionState(addCategory , {error: ''})
    return (
        <form action={formAction}>
            <label htmlFor="">Add Your New Category.</label>
            <input type="text" name="category" />
            <AButton title="ADD" />
        </form>
    )
}

export default FormAdd