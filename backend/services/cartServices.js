const Cart = require('../model/cartModel')
const Product = require('../model/productModel')

const deleteCartProducts = async(user_id, product_id) => {
    const cart = await Cart.findOne({user_id})
    // console.log(cart)
    if(cart){
        if(cart.Products.length == 1){
            await Cart.deleteOne({user_id})
            return "Cart deleted Successfully"
        }else{
            const products = await cart.Products.filter((item) => item.product_id !== product_id)
            try{
                cart.Products = products
                cart.save()
                return "Product deleted Successfully from Cart"
            }catch(err){
                console.log(err)
                return "Product not deleted"
            }
        }
    }else{
        return "Cart is not found"
    }
}

const getCartProducts = async(user_id) => {
    try{
        console.log(user_id)
        const cart = await Cart.findOne({user_id});
        console.log(cart)
        if(!cart){
            return "Cart is not found"
        }else{
            const productIds = cart.Products.map(product => product.product_id)            
            const products = await Product.find({ user_id : {$in: productIds }})
            var subtotal = 0;

            const productDetails = cart.Products.map(item => {
                const product = products.find(p => p.id === item.product_id);
                subtotal += product.price * item.quantity;
                return {
                    title: product.title,
                    description: product.description,
                    price : product.price,
                    quantity: item.quantity,
                    total: (product.price * item.quantity)
                };
            })
            return{productDetails, subtotal}
        }
    }catch(err){
        console.log(err)
        return "Error retrieving cart"
    }
}

const deleteCart = async(user_id) => {
    await Cart.deleteOne({user_id})
}
module.exports = { deleteCartProducts, getCartProducts, deleteCart }
