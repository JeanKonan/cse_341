const express = require('express');
const routes = express.Router();

routes.use('/users', require('./users'));

module.exports = routes;