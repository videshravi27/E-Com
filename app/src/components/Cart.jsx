import { useSelector } from 'react-redux'
import CartCard from './CartCard'

function Cart() {
    const cartItems = useSelector((state) => state.cart.items)
    return (
    <>
        {cartItems.map((item) => <CartCard  key={item.id} item={item}/>)}
    </>
)
}

export default Cart