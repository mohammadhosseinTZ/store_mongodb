import connect from "@/lib/db";
import Category from "@/lib/modals/categories";
import Products from "@/lib/modals/products";
import { writeFile, writeFileSync } from "fs";
import { Types } from "mongoose";
import { NextResponse } from "next/server"
import path from "path";


export const GET = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get("categoryId");

        await connect();

        if (categoryId === "all" || !categoryId) {
            const categories = await Products.find();
            return new NextResponse(JSON.stringify(categories), { status: 200 });
        }
        if (!categoryId || !Types.ObjectId.isValid(categoryId)) {

            return new NextResponse(JSON.stringify({ message: "Invalid or missing categoryId" }), { status: 400 })
        }

        const category = await Products.findById(categoryId);
        if (!category) {
            return new NextResponse(
                JSON.stringify({ message: "Category not found" }),
                { status: 404 }
            );
        }

        return new NextResponse(JSON.stringify(category), { status: 200 });

    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: "Error fetching data", error: error.message }),
            { status: 500 }
        );
    }
};

export async function POST(req: Request) {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const gender = formData.get("gender") as string;
    const categoryId = formData.get("categoryId") as string;
    const image = formData.get("image") as File;

    if (!title || !gender || !categoryId || !image) {
        return NextResponse.json({ error: "مقادیر ناقص" }, { status: 400 });
    }

    if (!Types.ObjectId.isValid(categoryId)) {
        return NextResponse.json({ error: "آی‌دی اشتباه است" }, { status: 400 });
    }

    await connect();

    const category = await Category.findById(categoryId);
    if (!category) {
        return NextResponse.json({ error: "دسته‌بندی یافت نشد" }, { status: 404 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = Date.now() + "-" + image.name;
    const uploadPath = path.join(process.cwd(), "public/uploads", filename);
    await writeFileSync(uploadPath, buffer);


    const newProduct = new Products({
        title,
        Gender: gender,
        image: `/uploads/${filename}`,
        category: categoryId,
    });

    await newProduct.save();

    return NextResponse.json({ message: "محصول اضافه شد", product: newProduct }, { status: 201 });
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("productId");

        if (!productId || !Types.ObjectId.isValid(productId)) {
            return new NextResponse(JSON.stringify("Invalid id ..."), { status: 500 })
        }

        await connect();

        const deleteProduct = await Products.findByIdAndDelete(new Types.ObjectId(productId))
        if (!deleteProduct) {
            return new NextResponse(
                JSON.stringify({ message: "product not found in the database" }),
                { status: 400 }
            );
        }

        return new NextResponse(
            JSON.stringify({ message: "product is deleted", user: deleteProduct }),
            { status: 200 }
        );
    } catch (error: any) {
        return new NextResponse("Error in deleting product" + error.message, {
            status: 500,
        });
    }
}