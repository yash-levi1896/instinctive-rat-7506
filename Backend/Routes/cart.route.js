const express=require('express');
const {CartModel}=require('../Models/cart.model');
const jwt=require('jsonwebtoken')
const cartRoute=express.Router();

cartRoute.get("/",async (req,res)=>{
    const token=req.headers.authorization.split(' ')[1];
    //console.log("token",token)
    if(token){
        const decoded=jwt.verify(token,'masai');
    
   // console.log(decoded)
    if(decoded.userID){
        try {
            const user= await CartModel.find({userID:decoded.userID});
            res.status(200).send(user)
        } catch (error) {
            res.status(400).send({"msg":error.message})
        } 
    }
}else{
    res.status(400).send({"msg":"Please login!"})
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