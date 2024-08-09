const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
});

userSchema.statics.signup = async function(name, email, password) {
    if(!name || !email || !password){
        throw Error('All fields must be filled')
    }
    const exists = await this.findOne({ email })

    if(exists){
        throw Error('Email already Signedup, Login')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({name, email, password: hash})

    return user
}

userSchema.statics.login = async function(name, email, password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({ email })

    if(!user){
        throw Error('Incorrect Email')
    }
    const match = await bcrypt.compare(password, user.password)
    
    if(!match){
        throw Error('Incorrect Password')
    }
    
    return user
}
module.exports = mongoose.model("User", userSchema)