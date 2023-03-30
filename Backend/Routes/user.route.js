const express=require('express');
const { UserModel } = require('../Models/user.model');
const otpGenerator = require('otp-generator')

const userRoute=express.Router();

userRoute.post("/register",async(req,res)=>{
    try {
         const user=await new UserModel(req.body);
         user.save();
         res.status(200).send({msg:"user registered"})
    } catch (error) {
        res.status(400).send({msg:"error.message"})
    }
})

userRoute.post("/login",async(req,res)=>{
    user=await UserModel.find(req.body);
    if(user.length>0){
       const OTP= otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false});
        res.send({msg:`${OTP}`});
    }else{
        res.status(200).send({msg:"please registered first!"})
    }
})






module.exports={userRoute}