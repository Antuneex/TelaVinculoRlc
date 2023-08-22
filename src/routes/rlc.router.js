const express = require('express');
const rlcRoutes = express.Router();

const BuildPageController = require('../controllers/BuildPageController')
const VinculaRLCController = require('../controllers/VinculaRLCController')

const buildPageController = new BuildPageController()
const vinculaRLCController = new VinculaRLCController()

rlcRoutes.get('/', buildPageController.execute);
rlcRoutes.post('/', vinculaRLCController.execute);

module.exports = rlcRoutes