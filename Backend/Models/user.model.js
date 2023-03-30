const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    Phone_No:Number,
    email:String,
    Name:String
})

const UserModel=mongoose.model("user",userSchema);

module.exports={UserModel}