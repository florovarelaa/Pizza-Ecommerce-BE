const Order_detail = require('../models/order_detail.model.js');

// create and save a new order
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
      res.status(400).send({
          message: 'content can not be empty!'
      })
  };

  // create an order_detail
  const order_detail = new Order_detail({
    id_order: req.body.id_order,
    id_product: req.body.id_product,
    unit_price: req.body.unit_price,
    quantity: req.body.quantity
    });

  // save order_detail in database
  Order_detail.create(order_detail, (err, data) => {
      if (err) {
          res.status(500).send({
              message: err || 'an error ocurred when creating the order_detail.'
          });
      } else {
          res.send(data);
      }
  });
};

// retrieve all order_detail from the database.
exports.findAll = (req, res) => {
    Order_detail.findAll( (err, data) => {
    if (err) {
        res.status(500).send({
            message: err || 'an error ocurred while retrieving order_detail.'
        })
    } else {
        res.send(data);
    }
  })
};

// find a single order_detail with a id_order_detail
exports.findById = (req, res) => {
    Order_detail.findById(req.params.id_order_detail, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `not found order_detail with id ${req.params.id_order_detail}.`
                });
            } else {
                res.status(500).send({
                    message: "error retrieving order_detail with id " + req.params.id_order_detail
                });
            }
        } else {
            res.send(data);
        }
    });
};

// find all order_detail from a given order
exports.findAllByOrderId = (req, res) => {
    Order_detail.findAllByOrderId(req.params.id_order, (err, data) => {
    if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
                message: `not found order_detail with id_order ${req.params.id_order}.`
            });
        } else {
            res.status(500).send({
                message: "error retrieving order_detail with id_order " + req.params.id_order
            });
        }
    } else {
        res.send(data);
    }
  });
};

// find all order_detail from a given id_product
exports.findAllByProductId = (req, res) => {
    Order_detail.findAllByProductId(req.params.id_product, (err, data) => {
    if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
                message: `not found order_detail with id_product ${req.params.id_product}.`
            });
        } else {
            res.status(500).send({
                message: "error retrieving order_detail with id_product " + req.params.id_product
            });
        }
    } else {
        res.send(data);
    }
  });
};

// delete an order_detail with the specified id_order_detail in the request
exports.deleteById = (req, res) => {
  Order_detail.remove(req.params.id_order_detail, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `not found order_detail with id ${req.params.id_order_detail}.`
        });
      } else {
        res.status(500).send({
          message: "could not delete order_detail with id " + req.params.id_order_detail
        });
      }
    } else {
        res.send({ message: `order_detail ${req.params.id_order_detail} was deleted successfully!` });
    }
  });
};