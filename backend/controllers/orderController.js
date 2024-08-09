const Order = require('../model/orderModel')
const User = require('../model/userModel')
const Cart = require('../model/cartModel')
const Product = require('../model/productModel')
const cartServices = require('../services/cartServices')
const {v4: uuidv4 } = require('uuid')

const createOrder = async (req, res) => {
    const user_id = req.user.user_id
    console.log(user_id)
    try{
        const { cust_name, cust_phone, cust_address, product_id } = req.body
        const cart = await Cart.findOne({user_id})
        console.log(cart)
        if(!cart){
            res.status(404).json({status : "failure" , message: "No Items in Cart"})
        }
        if(!product_id){
            const product_ids = cart.Products.map(item => item.product_id)
            console.log(product_ids)
            
            const products = await Product.find({id : { $in : product_ids}})
            console.log(products)
            let subtotal = 0
            const order_item = cart.Products.map(item => {
                const product = products.find(p => p.id === item.product_id) 
                subtotal += item.quantity * product.price
                return{
                    product_id : item.product_id,
                    quantity: item.quantity,
                    price: product.price,
                    total: item.quantity * product.price 
                }
            })
            const user = await User.findById(user_id)
            console.log(order_item)
            console.log("Hello");

            const order = new Order({
                id: uuidv4(),
                cust_name,
                cust_phone,
                cust_address,
                Products: order_item, 
                total_amount: subtotal,
                order_status: "In progress",
                user_id: req.user.user_id,
            })
            await order.save()
            res.json({status:"success" ,message : "Cart ordered successfully", order})
            await cartServices.deleteCart(user_id)
        }else{
            const productIds = await cart.Products.map(item => item.product_id)
            console.log(productIds)
            const products = await Product.find({ id : { $in : productIds }})
            console.log(products)
            console.log("hai")
            let subtotal = 0
            const productDetails = products.map(item =>{
                const product = cart.Products.find(p => p.product_id == item.id)
                subtotal += item.price * product.quantity
                return{
                    product_id : item.product.id,
                    quantity: product.quantity,
                    price: item.price,
                    total: (item.price * product.quantity)
                }
            })
            const user = await User.findById(user_id)
            console.log(productDetails)

            const order = new Order({
                id: uuidv4(),
                cust_name,
                cust_phone,
                cust_address,
                Products: productDetails, 
                total_amount: total,
                order_status: "In progress",
                user_id: req.user.user_id,
                user_email: req.user.email
            })
            await order.save()
            res.json({status:"success",message : "Product ordered successfully"})
            await cartServices.deleteCartProducts(user_id, product_id)
        }
    }catch(err){
        console.log(err)
        res.status(500).json({status:"failure",message:"Cannot create new order"})
    }
}

const getAllOrders = async (req, res) => {
    try{
        const user_id = req.user.user_id;
        console.log(user_id)

        const orders = await Order.find({user_id})
        console.log(orders)
        const orderDetails = await Promise.all(
            orders.map(async (order) => {
                const products = await Promise.all(
                    order.Products.map(async (product) => {
                        const productDetails = await Product.findOne({id: product.product_id})
                        console.log(productDetails)
                        return {
                            product_title: productDetails.title,
                            product_description: productDetails.description,
                            product_price: product.price,
                            product_quantity: product.quantity,
                            Product_total: product.total
                        }
                    })
                )
                return {
                    order_id: order.id,
                    Products: products,
                    order_date: order.order_date,
                    delivery_date: order.delivery_date,
                    order_status: order.order_status,
                }
            })
        )
        console.log(orderDetails)
        res.json({status:"success",message:"Orders fetched",orderDetails})
    }catch(err){
        console.error('Error fetching orders:', err);
        res.json({status:"failure",message:"cannot fetch orders",})
    }
}

module.exports = { createOrder, getAllOrders}
