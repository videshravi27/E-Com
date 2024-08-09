const express = require('express');
const Router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require("../middleware/auth");

Router.post('/createorder',auth, orderController.createOrder);
Router.get('/getAllorders',auth, orderController.getAllOrders);

module.exports = Router;