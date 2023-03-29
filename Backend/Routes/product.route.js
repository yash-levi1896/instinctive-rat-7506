const express=require('express');
const {ProductModel}=require('../Models/product.model')
const productRoute=express.Router();


productRoute.post("/add",async(req,res)=>{
         try {
            await ProductModel.insertMany(req.body);
            res.status(200).send({msg:"Product added!"})
         } catch (error) {
            console.log(error);
            res.status(400).send({msg:error.message});
         }
})

module.exports={productRoute}