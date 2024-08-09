import axios from 'axios'
import { useEffect, useState } from "react"
// import { PRODUCTS } from "../constants"
import ProductCard from "./ProductCard"

const Products = (props) => {
    const [listProducts, setListProducts] = useState([])

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        const res = await axios.get("https://e-com-y1g3.onrender.com/product/")
        setListProducts(res.data.products)
        console.log(res.data.products)
    }

    return (
        <div className="flex flex-wrap gap-1">
            {listProducts.map((item) => (
                <ProductCard key={item.id} item={item} setCart={props.setCart}/>
            ))}
        </div>
    )
}

export default Products
