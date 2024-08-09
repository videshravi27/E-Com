import React from 'react'
import { addItem } from '../redux/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ProductCard = (props) => {
    const cartItems = useSelector((state) => state.cart.items)
    const token = useSelector((state) => state.user.token)
    console.log(token)
    const isInCart = cartItems.find((el) => el.id === props.item.id)

    const dispatch = useDispatch()
    const handleAdd = async () => {
        const payload = {
            product_id: props.item.id,
            quantity: 1
        }
        console.log(props.item.id)
        const res = await axios.post("https://e-com-y1g3.onrender.com/cart/addtocart", payload, {
            headers : {
                Authorization: `Bearer ${token}`, 
            },
        })
        console.log(res)
        dispatch(addItem(props.item))    
    }
    
    return (
    <>
        <div className="product-card mt-10 border border-black rounded-xl">
        <img className="" src={props.item.image}></img>
        <p className="font-bold">{props.item.title}</p>
        <p className="mt-10">{props.item.description}</p>
        <div className="font-bold justify-center mt-10">${props.item.price}</div>
        {isInCart ? (
            <Link to="/cart">
                <button className="bg-black text-white rounded-sm hover:bg-gray-500">Go to Cart</button>
            </Link>
        ) : (
            <button className="bg-black text-white rounded-sm hover:bg-gray-500" onClick={handleAdd}>Add to Cart</button>
        )
        }
    </div>
    </>
    )
}

export default ProductCard
