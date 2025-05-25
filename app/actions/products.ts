"use server"

import { revalidatePath } from "next/cache"

export const del = async (productId: string ,formData : FormData)=>{
    const res = await fetch(`http://localhost:3000/api/products?productId=${productId}` , {cache:"no-store" , method:"DELETE"})
    if(!res.ok)return
    console.log(res.ok);
    
    revalidatePath("/admin/products")
}