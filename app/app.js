const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const routes = require('./routes/index.js');

let app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// router middleware
app.use(routes)


module.exports = app;