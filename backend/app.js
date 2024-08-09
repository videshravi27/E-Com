require('dotenv').config()

const express = require('express');
const mongoose=require("mongoose")
const cors = require('cors')

const bodyparser = require("body-parser")

const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRoutes")

const app = express();
app.use(bodyparser.json())
app.use(cors())

mongoose
.connect("mongodb+srv://videsh:videsh@cluster0.gdpe4dg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to MongoDB")
})

app.set('view engine',"ejs");

app.use('/product',productRoutes)
app.use('/user',userRoutes);
app.use('/cart',cartRoutes);
app.use('/order',orderRoutes)

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})