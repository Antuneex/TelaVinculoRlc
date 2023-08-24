const express = require('express');
const rlcRoutes = express.Router();

const BuildPageController = require('../controllers/BuildPageController')
const VinculaRLCController = require('../controllers/VinculaRLCController')
const RLCController = require('../controllers/RLCController')


const buildPageController = new BuildPageController()
const rlcController = new RLCController()

rlcRoutes.get('/', buildPageController.execute);
rlcRoutes.post('/', rlcController.execute);

module.exports = rlcRoutes