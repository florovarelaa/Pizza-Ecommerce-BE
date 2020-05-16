const Product = require('../models/product.model.js');

// create and save a new product
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
      res.status(400).send({
          message: 'content can not be empty!'
      })
  };

  // create a product
  const product = new Product({
    product_name: req.body.product_name,
    unit_price: req.body.unit_price,
    description: req.body.description,
    product_imgUrl: req.body.product_imgUrl
});

  // save product in database
  Product.create(product, (err, data) => {
      if (err) {
          res.status(500).send({
              message: err.message || 'an error ocurred when creating the product.'
          });
      } else {
          res.send(data);
      }
  });
};

// find a single product with a id_product
exports.findById = (req, res) => {
    Product.findById(req.params.id_product, (err, data) => {
          if (err) {
              if (err.kind === "not_found") {
                  res.status(404).send({
                      message: `not found product with id ${req.params.id_product}.`
                  });
              } else {
                  res.status(500).send({
                      message: "error retrieving product with id " + req.params.id_product
                  });
              }
          } else {
              res.send(data);
          }
      });
  };

// retrieve all products from the database.
exports.findAll = (req, res) => {
  Product.findAll( (err, data) => {
    if (err) {
        res.status(500).send({
            message: err.message || 'an error ocurred while retrieving products.'
        })
    } else {
        res.send(data);
    }
  })
};

// update a product identified by the id_product in the request
exports.updateById = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: "content can not be empty!"
    });
  }

  Product.updateById(
    req.params.id_product,
    new Product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `not found product with id ${req.params.id_product}.`
          });
        } else {
          res.status(500).send({
            message: "error updating product with id " + req.params.id_product
          });
        }
      } else {
          res.send(data);
      }
    }
  );
};

// delete a product with the specified id_product in the request
exports.deleteById = (req, res) => {
  Product.remove(req.params.id_product, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `not found product with id ${req.params.id_product}.`
        });
      } else {
        res.status(500).send({
          message: "could not delete product with id " + req.params.id_product
        });
      }
    } else {
        res.send({ message: `product ${req.params.id_product} was deleted successfully!` });
    }
  });
};