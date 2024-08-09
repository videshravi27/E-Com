const mongoose = require("mongoose")
const Cart = require('../model/cartModel')
const Product = require('../model/productModel')
const CartServices  = require('../services/cartServices')
const ObjectId = mongoose.Types.ObjectId;

const addToCart = async (req, res) => {
    try{
        const user_id = req.user.user_id;
        const { product_id, quantity } = req.body;
        // console.log(user_id)
        const cart = await Cart.findOne({user_id});
        if(cart){
            let productIndex = await cart.Products.find(p => p.product_id === product_id);
            if(productIndex){
                productIndex.quantity += quantity
                await cart.save()
                res.status(200).json({ status: "success",message : "Product quantity in Cart is updated", productIndex});
            }else{
                let newProduct = { product_id, quantity}
                cart.Products.push(newProduct);
                await cart.save()
                res.status(200).json({status: "Success",message : "Product added to Cart successfully", newProduct});
            }
        }
        else{
            const newCart = new Cart({
                user_id,
                Products : [{ product_id,quantity }]
            });
            await newCart.save();
            res.status(200).json({message: "Cart added"});
        } 
    }catch(err){
        console.log(err);
        res.status(500).json({message:"error",error: err.message});
    }
}

// const getCartitems = async(req, res) => {
//     try{
//         const response = await CartServices.getCartProducts(req.user.user_id)
//         res.status(200).json(response)
//     }catch (error) {
//         console.error('Error retrieving cart items', error);
//         res.status(500).json({ status: "failure", message: "Error retrieving cart items" });
//     }
// }

const getCartitems = async(req, res) => {
    const user_id = req.user.user_id;
    try{
        // console.log(user_id)
        const cart = await Cart.findOne({user_id});
        // console.log(cart)
        // res.json(cart)
        if(!cart){
            return res.json({status: "failure", message : "Cart is not found"})
        }
        const productIds = cart.Products.map(product => product.product_id);  
        // console.log(productIds)        
        const products = await Product.find({ id : { $in: productIds }})
        var subtotal = 0;
        // console.log(products)    

        const productDetails = cart.Products.map(item => {
            const product = products.find(p => p.id === item.product_id);
            subtotal += product.price * item.quantity;
            return {
                id: item.product_id,
                title: product.title,
                description: product.description,
                price : product.price,
                quantity: item.quantity,
                total: (product.price * item.quantity)
            };
        })
        res.json({productDetails, subtotal})
    }catch(err){
        console.log(err)
        return "Error retrieving cart"
    }
}

const deleteCartitems = async(req, res) => {
    const cart = await CartServices.deleteCartProducts(req.user.user_id, req.body.product_id)
    res.status(200).json({ status: "success", message:  cart });
    // await CartServices.getCartProducts(req.user);
}

module.exports = { addToCart, getCartitems, deleteCartitems } 