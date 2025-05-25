import connect from "@/lib/db"
import Category from "@/lib/modals/categories"
import { Types } from "mongoose";
import { NextResponse } from "next/server"

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async () => {
    try {
        await connect()
        const categories = await Category.find();
        return new NextResponse(JSON.stringify(categories), { status: 200 })
    } catch (error: any) {
        return new NextResponse(JSON.stringify("Error in fetching Categories"), { status: 500 })
    }
}

export const POST = async (request: Request) => {
    try {
        const body = await request.json()
        await connect();
        const newCategory = new Category(body);
        await newCategory.save()
        return new NextResponse(
            JSON.stringify({ message: "category is created", category: newCategory }),
            { status: 200 }
        );
    } catch (error: any) {
        return new NextResponse(JSON.stringify("Error in POST Categories"), { status: 500 })
    }
}

export const PATCH = async (request: Request) => {
    try {
        const { categoryId, newTitle } = await request.json();

        if (!categoryId || !newTitle) {
            return new NextResponse(JSON.stringify("id and newTitle not found"), { status: 400 })
        }
        if (!Types.ObjectId.isValid(categoryId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid category id" }), {
                status: 400,
            });
        }

        const updateCategory = await Category.findByIdAndUpdate(
            { _id: new ObjectId(categoryId) },
            { title: newTitle },
            { new: true }
        )

        if (!updateCategory) {
            return new NextResponse(
                JSON.stringify({ message: "category not found in the database" }),
                { status: 400 }
            );
        }

        return new NextResponse(
            JSON.stringify({ message: "category is updated", category: updateCategory }),
            { status: 200 }
          );

    } catch (error: any) {
        return new NextResponse(JSON.stringify("Error in UPDATING Categories"), { status: 500 })
    }
}

export const DELETE = async (request: Request)=>{
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get("categoryId");
    
        if (!categoryId) {
          return new NextResponse(JSON.stringify({ message: "ID not found" }), {
            status: 400,
          });
        }
    
        if (!Types.ObjectId.isValid(categoryId)) {
          return new NextResponse(JSON.stringify({ message: "Invalid category id" }), {
            status: 400,
          });
        }
    
        await connect();
    
        const deletedCategory = await Category.findByIdAndDelete(
          new Types.ObjectId(categoryId)
        );
    
        if (!deletedCategory) {
          return new NextResponse(
            JSON.stringify({ message: "category not found in the database" }),
            { status: 400 }
          );
        }
    
        return new NextResponse(
          JSON.stringify({ message: "category is deleted", category: deletedCategory }),
          { status: 200 }
        );
      } catch (error: any) {
        return new NextResponse("Error in deleting category" + error.message, {
          status: 500,
        });
      }
}