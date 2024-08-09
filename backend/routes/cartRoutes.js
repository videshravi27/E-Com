const express = require('express');
const Router = express.Router();
const cartController = require("../controllers/cartController");
const auth = require('../middleware/auth')

Router.post('/addtocart', auth, cartController.addToCart)
Router.get("/getcart", auth, cartController.getCartitems);
Router.delete("/deletecart", auth, cartController.deleteCartitems);

module.exports = Router;