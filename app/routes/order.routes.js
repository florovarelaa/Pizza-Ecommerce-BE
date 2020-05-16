const express = require('express');
let router = express.Router();

const order = require("../controllers/order.controller.js");
const cartOrder = require("../controllers/cartOrder.controller.js");

// create a new order
router.post("/orders", order.create);

// create a new cart order
router.post("/cartorder", cartOrder.create);

// retrieve all orders
router.get("/orders", order.findAll);

// retrieve a single order with id_order
router.get("/orders/:id_order", order.findById);

// retrieve a single order with user_id
router.get("/orders/id_user/:id_user", order.findByUserId);

// delete a order with id_order
router.delete("/orders/:id_order", order.deleteById);

module.exports = router;