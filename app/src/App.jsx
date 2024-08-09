import Products from "./components/Products";
import './App.css'
import { useEffect, useState } from "react";
import store from "./redux/store";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./components/HomeLayout";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setToken } from "./redux/userSlice";

const App = () => {
  // const [cart, setCart] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token')
    dispatch(setToken(token))
  })
  return(
    // <Provider store={store}>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<HomeLayout /> }>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    // </Provider>
  )
}

export default App;