const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

var connection  = mysql.createPool(dbConfig);

module.exports = connection;