const Order = require('../models/order.model.js');

// create and save a new order
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
      res.status(400).send({
          message: 'content can not be empty!'
      })
  };

  let regex = /([a-zA-Z]){2,40}\s{1}\d{1,5}/;
  let validAddress = regex.test(req.body.ship_address);

  if(!validAddress) {
    res.status(400).send({
      message: `${req.body.ship_address} is not a valid ship_address. ship_address must have the format "StreetName 1234"`
    })
    return;
  }

  // create an order
  const order = new Order({
      id_user: req.body.id_user,
      ship_address: req.body.ship_address,
    });

  // save order in database
  Order.create(order, (err, data) => {
      if (err) {
          res.status(500).send({
              message: err.message || 'an error ocurred when creating the order.'
          });
      } else {
          res.send(data);
      }
  });
};

// retrieve all orders from the database.
exports.findAll = (req, res) => {
  Order.findAll( (err, data) => {
    if (err) {
        res.status(500).send({
            message: err.message || 'an error ocurred while retrieving orders.'
        })
    } else {
        res.send(data);
    }
  })
};

// find a single order with a id_order
exports.findById = (req, res) => {
  Order.findById(req.params.id_order, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `not found order with id ${req.params.id_order}.`
                });
            } else {
                res.status(500).send({
                    message: "error retrieving order with id " + req.params.id_order
                });
            }
        } else {
            res.send(data);
        }
    });
};

// find all orders from user
exports.findByUserId = (req, res) => {
  Order.findByUserId(req.params.id_user, (err, data) => {
    if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
                message: `not found orders with id_user ${req.params.id_user}.`
            });
        } else {
            res.status(500).send({
                message: "error retrieving order with id_user " + req.params.id_user
            });
        }
    } else {
        res.send(data);
    }
  });
};

// delete an order with the specified id_order in the request
exports.deleteById = (req, res) => {
  Order.remove(req.params.id_order, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `not found order with id ${req.params.id_order}.`
        });
      } else {
        res.status(500).send({
          message: "could not delete order with id " + req.params.id_order
        });
      }
    } else {
        res.send({ message: `order ${req.params.id_order} was deleted successfully!` });
    }
  });
};