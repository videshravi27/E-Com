import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCart } from "../redux/cartSlice";

const Navbar = (props) => {
    const cartItems = useSelector((state) => state.cart.items);
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    useEffect(() => {
        if(token){
            console.log("Getting Cart Details")
            getCartProducts()
        }
    }, [token])

    const getCartProducts = async () => {
        const res = await axios.get('https://e-com-y1g3.onrender.com/cart/getcart', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        dispatch(setCart(res.data.productDetails))
        console.log(res.data.productDetails)
    }
    return (
        <header className="flex-container">
            <div>Logo</div>
            <nav className="flex font-bold justify-end items-end gap-8 ml-10">
                <Link to="/">Products</Link>  
                <p>About</p>
                <Link to="/cart">Cart: {cartItems.length}</Link>
                {token ? (<Link to="/login">Logout</Link>) : <p><Link to="/login">Login</Link></p>}
            </nav>  
        </header>
    );
}

export default Navbar;