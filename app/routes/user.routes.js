const express = require('express');
let router = express.Router();

const user = require("../controllers/user.controller.js");

// create a new user
router.post("/users", user.create);

// retrieve all users
router.get("/users", user.findAll);

// retrieve a single user with id_user
router.get("/users/:id_user", user.findById);

// retrieve a single user with username
router.get("/users/username/:username", user.findByUsername);

// update a user with id_user
router.put("/users/:id_user", user.updateById);

// delete a user with id_user
router.delete("/users/:id_user", user.deleteById);

module.exports = router;