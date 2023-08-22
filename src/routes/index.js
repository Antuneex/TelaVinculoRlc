const express = require('express');
const routes = express.Router();

const rlcRoutes = require('./rlc.router')

routes.use('/vincula-rlc', rlcRoutes)

module.exports = routes