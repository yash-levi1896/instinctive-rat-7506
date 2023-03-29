const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    image:String,
    name:String,
    price:Number
})

const ProductModel=mongoose.model("product",productSchema)

module.exports={ProductModel}