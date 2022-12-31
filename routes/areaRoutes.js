const express = require('express')
const router = express.Router()
const areasController = require('../controllers/areasController')

router.route('/')
    .get(areasController.getAllAreas)
    .post(areasController.createArea)
    .patch(areasController.updateArea)
    .delete(areasController.deleteArea)

module.exports = router