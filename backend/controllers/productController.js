const express = require('express');
const Product = require("../model/productModel");
const { v4: uuidv4 } = require('uuid');

const getAllproducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.json({status:"success",message:"products fetched",products})
    }
    catch(err){
        res.json({status:"failure", message:"error occured"})
        console.log("error occured");
    }
}

const addProduct = async (req, res) => {
    try {
        const {id,title,description,category,price,image,rating} = req.body;
        const product = new Product({
            id: uuidv4(),
            ...req.body
        })
        await product.save();
        res.status(200).json({ status: "success", message: "Product added successfully", product});
    } catch (error) {
        res.status(500).json({ status: "failed", message: "Cannot add product", error: error.message });
    }
};

// const updateproduct = async (req,res) => {
//     const Id = req.params.id;
//     try{
//         const product = await Product.findById(Id);
//         if(product){
//             await product.updateOne(
//             {
//                 "title":req.body.title,
//                 "description":req.body.description,
//                 "category":req.body.category,
//                 "price":req.body.price,
//                 "image":req.body.image,
//                 "rating":req.body.rating
//             })
//         }
//         res.status(200).json({ status: "success", message: "Product Updated successfully" });
//     } catch (error) {
//         res.status(500).json({ status: "failed", message: "Cannot update product", error: error.message });
//     }
// }

// const deleteproduct = async(req,res) => {
//     const Id = req.params.id;
//     try{
//         await Product.findByIdAndDelete(Id);
//         res.status(200).json({ status : "success", message : "Product deleted successfully"});
//     }
//     catch(err){
//         res.status(500).json({ status: "failure", message:"Cannot delete product", error:err.message})
//     }
// }

module.exports = {getAllproducts,addProduct};

