const express=require('express');
const { connection } = require('./db');
const app=express();
app.use(express.json());
const {productRoute}=require('./Routes/product.route');
require('dotenv').config()



app.use("/product",productRoute)



app.listen(process.env.port,async()=>{
        try {
            await connection
            console.log('connected to db')
        } catch (error) {
            console.log('error')
        }
        console.log('server is running');
})