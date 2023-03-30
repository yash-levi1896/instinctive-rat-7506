const express=require('express');
const { connection } = require('./db');
const app=express();

const {productRoute}=require('./Routes/product.route');
const {cartRoute}=require('./Routes/cart.route');
const { userRoute } = require('./Routes/user.route');
require('dotenv').config()


app.use(express.json());
app.use("/product",productRoute)
app.use("/cart",cartRoute)
app.use("/user",userRoute)


app.listen(process.env.port,async()=>{
        try {
            await connection
            console.log('connected to db')
        } catch (error) {
            console.log('error')
        }
        console.log('server is running');
})