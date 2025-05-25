import {Schema , models , model} from "mongoose"

const productSchema = new Schema({
    title : {type:"string" , required:true } ,
    Gender : {type:"string" , required:true } ,
    image : {type:"string" ,  required:true} ,
    category : {type:Schema.Types.ObjectId , ref:"Categories"}
},{
    timestamps : true
})

const Products = models.Products || model("Products" , productSchema);

export default Products