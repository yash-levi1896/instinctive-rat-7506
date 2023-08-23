const express=require('express');
const { UserModel } = require('../Models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userRoute=express.Router();

userRoute.post("/register",async(req,res)=>{
    const {Phone_No,email,password,Name}=req.body;
    const user=await UserModel.find({Phone_No,email});
    //console.log(Phone_No)
    try {
        
        //console.log(user)
        if(user.length===0){
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    throw err
                }
                let userp=await new UserModel({Name,email,password:hash,Phone_No});
                 userp.save();
                res.status(200).send({msg:"user registered!"});
            })
        }
        else{
            res.status(400).send({msg:"user already exist please Login!"})
        }
    } catch (error) {
        res.status(400).send({msg:"error can't register the user"})
    }
    
})

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        let user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,async(err,result)=>{
                if(err)
                throw err;
                if(result){
                    res.status(200).send({msg:"sucessfully Login!","token":jwt.sign({'userID':user[0]._id},'masai'),"Name":user[0].Name})
                }else{
                    res.status(401).send({msg:"Wrong credentials"})
                }
            })
        }else{
            res.status(400).send({msg:"Registered First!"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})






module.exports={userRoute}