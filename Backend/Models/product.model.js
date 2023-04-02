const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    image:String,
    name:String,
    price:Array,
    category:String,
    deposit_fee:Number,
    city:String
})

const ProductModel=mongoose.model("product",productSchema)

module.exports={ProductModel}