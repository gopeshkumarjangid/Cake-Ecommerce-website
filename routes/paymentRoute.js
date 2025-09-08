const express = require('express');
const paymentController = require('../controller/paymentController');
const payment_route = express();

const bodyParser = require('body-parser');
payment_route.use(bodyParser.json());
payment_route.use(bodyParser.urlencoded({ extended:false }));

const path = require('path');

payment_route.set('view engine','ejs');
payment_route.set('views',path.join(__dirname, '../views'));



payment_route.get('/payment', paymentController.renderProductPage);
payment_route.post('/createOrder', paymentController.createOrder);

module.exports = payment_route;
