const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique : true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category:{
    type:String
  },
  price:{
    type: Number,
    required: true
  },
  image:{
    type:Number
  },
  rating:{
    type: Number,
  },
  count:{
    type:Number
  },
});

module.exports = mongoose.model("Product", productSchema);