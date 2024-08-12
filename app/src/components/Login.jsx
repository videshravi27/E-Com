import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setToken } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const returnTo = searchParams.get("return_to") || "/";

    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            const payload = {
                email: email,
                password: password,
            }
            const res = await axios.post("https://e-com-y1g3.onrender.com/user/login",
                payload
            );
            console.log(res);
            dispatch(setToken(res.data.token));
            localStorage.setItem("token", res.data.token);
            toast.success("Login successful")
            navigate(returnTo)
        }catch(err){
            toast.error(err.response.data.message);
            console.log(err);
        }
    }

    return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white px-4">
        <div className="text-2xl font-bold text-black mb-8">Login</div>
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md">
            <form onSubmit={handleLogin} className="space-y-6">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                Login
                </button>
                <Link to="/register"></Link>
            </form>
        </div>
    </div>
    );
};

export default Login;