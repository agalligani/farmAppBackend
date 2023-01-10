const express = require('express')
const router = express.Router()
const plantingController = require('../controllers/plantingController')

router.route('/')
    .get(plantingController.getAllPlantings)
    .post(plantingController.createPlanting)
    .patch(plantingController.updatePlanting)
    .delete(plantingController.deletePlanting)

module.exports = router