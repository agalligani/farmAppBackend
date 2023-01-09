const express = require('express')
const router = express.Router()
const cropsController = require('../controllers/cropsController')

router.route('/')
    .get(cropsController.getAllCrops)
    .post(cropsController.createCrop)
    .patch(cropsController.updateCrop)
    .delete(cropsController.deleteCrop)

module.exports = router