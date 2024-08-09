const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('../model/userModel');

exports.login = async(req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    console.log(user);
    try{
        if(!user){
            return res.status(400).json({staus:"failure", message:"User not found"});
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.status(401).json({message:"Invalid password"});
        }
        const token = jwt.sign({user_id: user._id}, process.env.SECRET,{
            expiresIn:"8h",
        });
        // res.json({token});
        res.status(200).json({status:"success",message:"Login successful",token})
    }catch(err){
        res.status(500).json({status:"failed", error:err.message});
    }
};

exports.signUp = async(req,res)=>{
    try{
        const { name,email,password } = req.body;
        const user = await User.findOne({ email })
        if(user){
            return res.status(400).json({status:"failure",message:"username or email already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password : hashedPassword
        })
        await newUser.save();
        res.status(200).json({status:"success", message:"account created successfully",newUser})
    }
    catch(err){
        res.status(500).json({status:"failure",message:"cannot create new user"})
    }
}