const User = require('../models/user.model.js');

// create and save a new user
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
      res.status(400).send({
          message: 'content can not be empty!'
      })
  };

  // create a user
  const user = new User({
      username: req.body.username,
      pass: req.body.pass,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
});

  // save user in database
  User.create(user, (err, data) => {
      if (err) {
          res.status(500).send({
              message: err.message || 'an error ocurred when creating the user.'
          });
      } else {
          res.send(data);
      }
  });
};

// retrieve all users from the database.
exports.findAll = (req, res) => {
  User.findAll( (err, data) => {
    if (err) {
        res.status(500).send({
            message: err.message || 'an error ocurred while retrieving users.'
        })
    } else {
        res.send(data);
    }
  })
};

// find a single user with a id_user
exports.findById = (req, res) => {
  User.findById(req.params.id_user, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `not found user with id ${req.params.id_user}.`
                });
            } else {
                res.status(500).send({
                    message: "error retrieving user with id " + req.params.id_user
                });
            }
        } else {
            res.send(data);
        }
    });
};

// find a single user by username
exports.findByUsername = (req, res) => {
  User.findByUsername(req.params.username, (err, data) => {
    if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
                message: `not found user with username ${req.params.username}.`
            });
        } else {
            res.status(500).send({
                message: "error retrieving user with username " + req.params.username
            });
        }
    } else {
        res.send(data);
    }
  });
};

// update a user identified by the id_user in the request
exports.updateById = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: "content can not be empty!"
    });
  }

  User.updateById(
    req.params.id_user,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `not found user with id ${req.params.id_user}.`
          });
        } else {
          res.status(500).send({
            message: "error updating user with id " + req.params.id_user
          });
        }
      } else {
          res.send(data);
      }
    }
  );
};

// delete a user with the specified id_user in the request
exports.deleteById = (req, res) => {
  User.remove(req.params.id_user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `not found user with id ${req.params.id_user}.`
        });
      } else {
        res.status(500).send({
          message: "could not delete user with id " + req.params.id_user
        });
      }
    } else {
        res.send({ message: `user ${req.params.id_user} was deleted successfully!` });
    }
  });
};