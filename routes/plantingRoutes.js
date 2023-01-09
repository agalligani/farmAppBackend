const express = require('express')
const router = express.Router()
const plantingController = require('../controllers/plantingController')

router.route('/')
    .get(plantingController.getAllPlantings)
    .post(plantingController.createPlanting)

module.exports = router