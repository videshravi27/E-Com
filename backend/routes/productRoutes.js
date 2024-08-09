const express = require('express');
const Router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/auth");

Router.get('/', productController.getAllproducts)
Router.post('/addproduct', productController.addProduct)
// Router.patch('/updateproduct/:id', productController.updateproduct);
// Router.delete('/deleteproduct/:id', productController.deleteproduct);

module.exports =  Router;