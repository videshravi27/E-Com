const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const cartSchema =  new Schema({
    user_id : {
        type : String,
        require: true
    },
    Products : [
        {
            product_id : String,
            quantity : Number
        }
    ]
})

module.exports = mongoose.model("Cart", cartSchema)