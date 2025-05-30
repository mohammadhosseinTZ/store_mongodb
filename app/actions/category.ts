"use server"
interface TCategories {
    _id: string,
    title: string,
    createdAt: string,
    updatedAt: string,
}
import { revalidatePath } from "next/cache"

interface TState {
    error ?: string , 
    success ?: string , 
    data ?:any
}
export const addCategory = async (state: TState | undefined , formData : FormData)=>{
    const category = formData.get("category")
    
    const res = await fetch("http://localhost:3000/api/categories" , {
        cache:"no-store" ,
        method:"POST" ,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body:JSON.stringify({
            title : category 
        })
    })
 
    if(!res.ok) return {error : "error"}
    const data =await res.json()
    revalidatePath("/admin/categories")
    
    return {success : "successfully added" , data}   
}