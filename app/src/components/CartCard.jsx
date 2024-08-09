import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const CartCard = (props)  => {
    const { item } = props
    const dispatch = useDispatch()

    const token = useSelector((state) => state.user.token)
    const incrementItem = async () => {
        console.log(item)
        const payload = {
            product_id: item.id,
            quantity: item.quantity + 1,
        };
        const res = await axios.post('http://localhost:3000/cart/addtocart', payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    }
    return (
    <div className='mt-10 border border-black max-w-80 flex gap-4 h-auto' key={item.id}>
        <img src={item.image} alt={item.title} className="w-20 h-20" width={50}/>
        <div>
            <h3>{item.title}</h3>
            <div>
                <button className='border border-black'>-</button>&nbsp;
                {item.quantity || 1}&nbsp;
                <button className='border border-black' onClick={incrementItem}>+</button>
            </div>
            <div>${item.price}</div>
        </div>
    </div>
    )
}

export default CartCard
