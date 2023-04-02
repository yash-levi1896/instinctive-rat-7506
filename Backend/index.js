const express=require('express');
const { connection } = require('./db');
const app=express();

const cors=require('cors');
const {productRoute}=require('./Routes/product.route');
const {cartRoute}=require('./Routes/cart.route');
const { userRoute } = require('./Routes/user.route');
const { authentication } = require('./Middleware/user.middleware');
require('dotenv').config()


app.use(express.json());
app.use(cors());
app.use("/user",userRoute);
app.use("/product",productRoute)
app.use(authentication)
app.use("/cart",cartRoute)



app.listen(process.env.port,async()=>{
        try {
            await connection
            console.log('connected to db')
        } catch (error) {
            console.log('error')
        }
        console.log('server is running');
})