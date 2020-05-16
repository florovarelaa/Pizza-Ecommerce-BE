const Order = require('../models/order.model.js');
const User = require("../models/user.model.js");
const Order_detail = require('../models/order_detail.model.js');

// create and save a new cart order
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({
            message: 'content can not be empty!'
        })
    };

    let user = {
        email: req.body.email,
    }

    //first we create the user and get it's id
    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'an error ocurred when creating the user.'
            });
        } else {

            // create an order
            const order = new Order({
                id_user: data.id_user,
                ship_address: req.body.ship_address,
            });

            // save order in database
            Order.create(order, (err, data) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || 'an error ocurred when creating the order.'
                    });
                } else {
                    //create array of multiple orders to be inserted
                    multipleOrderDetail = req.body.products.map((e) => {
                        return [
                            data.id_order,
                            e.id,
                            e.price,
                            e.quantity
                        ]
                    })

                    //insert multiple orders
                    Order_detail.createMultiple(multipleOrderDetail, (err, data) => {
                        if (err) {
                            res.status(500).send({
                                message: err.message || 'an error ocurred when creating the order_detail'
                            })
                        } else {
                            res.send(data);
                        }
                    })
                }
            });
        };
    });
};