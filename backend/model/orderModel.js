const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    id : {
        type : String,
        required : true,
        unique : true
    },
    cust_name : {
        type : String,
        required : true
    },
    cust_phone : {
        type : Number,
        required : true
    },
    cust_address : {
        type : String,
        required : true
    },
    order_date : {
        type : Date,
        default : Date.now
    },
    delivery_date : {
        type : Date,
        default : new Date(Date.now()+ 5 * 24 * 60 * 60 * 1000)
    },
    Products : [{
        product_id : {
            type : String,
            required : true
        },
        quantity : {
            type : Number,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        total : {
            type : Number,
            required : true
        }
    }],
    total_amount : {
        type : Number,
        required : true
    },
    order_status : {
        type : String,
        default : "Pending"
    },
    user_id : {
        type : String,
        required : true
    }
    // user_email : {
    //     type : String,
    //     required : true
    // }
})

module.exports = mongoose.model( "Order", orderSchema)

