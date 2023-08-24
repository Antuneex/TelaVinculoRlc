const express = require('express');
const rlcRoutes = express.Router();

const BuildPageController = require('../controllers/BuildPageController')
const VinculaRLCController = require('../controllers/VinculaRLCController')
const DesvinculaRLCController = require('../controllers/DesvinculaRLCController')


const buildPageController = new BuildPageController()
const vinculaRLCController = new VinculaRLCController()
const desvinculaRLCController = new DesvinculaRLCController()

rlcRoutes.get('/', buildPageController.execute);
rlcRoutes.post('/vinculo', vinculaRLCController.execute);
rlcRoutes.post('/desvinculo', desvinculaRLCController.execute)


module.exports = rlcRoutes