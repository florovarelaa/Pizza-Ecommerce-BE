const express = require('express');

const userRoutes = require('./user.routes');
const orderRoutes = require('./order.routes');
const productRoutes = require('./product.routes');
const order_detailRoutes = require('./order_detail.routes');

let app = express();

app.use('/', userRoutes);
app.use('/', orderRoutes);
app.use('/', productRoutes);
app.use('/', order_detailRoutes);

module.exports = app;