const express = require('express');
let router = express.Router();

const product = require("../controllers/product.controller.js");

// create a new product
router.post("/products", product.create);

// retrieve all products
router.get("/products", product.findAll);

// retrieve a single product with id_product
router.get("/products/:id_product", product.findById);

// update a product with id_product
router.put("/products/:id_product", product.updateById);

// delete a product with id_product
router.delete("/products/:id_product", product.deleteById);

module.exports = router;