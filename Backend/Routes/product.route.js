const express=require('express');
const {ProductModel}=require('../Models/product.model')
const productRoute=express.Router();

productRoute.get("/",async (req,res)=>{
   // console.log(req.query)
    try {
        const product=await ProductModel.find();
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})
productRoute.get("/:city",async (req,res)=>{
   // console.log(req.query)
    try {
        const product=await ProductModel.find(req.params);
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})
productRoute.get("/:city/:category",async (req,res)=>{
   // console.log(req.query)
    try {
        const product=await ProductModel.find(req.params);
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

productRoute.post("/add",async(req,res)=>{
         try {
            await ProductModel.insertMany(req.body);
            res.status(200).send({msg:"Product added!"})
         } catch (error) {
            console.log(error);
            res.status(400).send({msg:error.message});
         }
})

productRoute.patch("/update/:productID",async(req,res)=>{
       const {productID}=req.params
       try {
            await ProductModel.findByIdAndUpdate({_id:productID},req.body)
            res.status(200).send({msg:"product updated!"})
       } catch (error) {
           res.status(400).send({msg:error.message})
       }
})
productRoute.delete("/delete/:productID",async(req,res)=>{
       const {productID}=req.params
       try {
            await ProductModel.findByIdAndDelete({_id:productID})
            res.status(200).send({msg:"product deleted!"})
       } catch (error) {
           res.status(400).send({msg:error.message})
       }
})


module.exports={productRoute}