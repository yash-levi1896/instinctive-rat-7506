const express=require('express');
const {CartModel}=require('../Models/cart.model')
const cartRoute=express.Router();

cartRoute.get("/",async (req,res)=>{
    try {
        const product=await CartModel.find();
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

cartRoute.post("/add",async (req,res)=>{
    const {name}=req.body;
       let product=await CartModel.find({name});
       if(product.length===0){
        try {
            const cart=await new CartModel(req.body);
            cart.save();
            res.status(200).send({msg:"Product added to the cart"})
        } catch (error) {
            res.status(400).send({msg:error.message});
    
        }
       }else{
          res.send({msg:"product is already in the cart"})
       }
    
})

cartRoute.delete("/delete/:cartID",async(req,res)=>{
    const {cartID}=req.params;
    try {
        await CartModel.findByIdAndDelete({_id:cartID});
        res.status(200).send({msg:"item got deleted"})
    } catch (error) {
        res.status(400).send({msg:error.message});
    }
})

cartRoute.patch("/update/:cartID",async(req,res)=>{
    const {cartID}=req.params;
    try {
        await CartModel.findByIdAndUpdate({_id:cartID},req.body);
        res.status(200).send({msg:"item got updated"})
    } catch (error) {
        res.status(400).send({msg:error.message});
    }
})

module.exports={cartRoute}