const express = require('express');
let router = express.Router();

const order_detail = require("../controllers/order_detail.controller.js");

// create a new order_detail
router.post("/order_detail", order_detail.create);

// retrieve all order_detail
router.get("/order_detail", order_detail.findAll);

// retrieve a single order_detail with id_order_detail
router.get("/order_detail/:id_order_detail", order_detail.findById);

// retrieve a single order with order_id
router.get("/order_detail/id_order/:id_order", order_detail.findAllByOrderId);

// retrieve a single order with product_id
router.get("/order_detail/id_product/:id_product", order_detail.findAllByProductId);

// delete an order_detail with order_detail
router.delete("/order_detail/:id_order_detail", order_detail.deleteById);

module.exports = router;