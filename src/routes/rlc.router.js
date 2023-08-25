const express = require('express');
const rlcRoutes = express.Router();

const BuildRLCPageController = require('../controllers/BuildRLCPageController')
const RLCController = require('../controllers/RLCController')

const buildRLCPageController = new BuildRLCPageController()
const rlcController = new RLCController()

rlcRoutes.get('/', buildRLCPageController.execute);
rlcRoutes.post('/', rlcController.execute);

module.exports = rlcRoutes