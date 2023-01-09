const Crop = require('../models/Crop')
const asyncHandler = require('express-async-handler')

// @desc Get all crops
// @route GET /crops
// @access Private

const getAllCrops = asyncHandler(async (req, res) => {

    const crops = await Crop.find().select().exec()
    if (!crops) {
        return res.status(400).json({message: 'No crops defined'})
    }
    
    res.json(crops)
})

// @desc Create new crops
// @route POST /crops
// @access Private

const createCrop = asyncHandler(async (req, res) => {

    const {name, qualifier, description, daysUntilMature } = req.body

    if ( !name || !daysUntilMature ) {
        return res.status(400).json({ message: "Name must be supplied"});
    }

    if (!typeof daysUntilMature == "number") {
        return res.status(400).json({ message: "Days Until Mature must be a Numeric value. (0 if unknown...)"});
    }

    const cropObject = { name, qualifier, description, daysUntilMature }
    const crop = await Crop.create(cropObject)

    if (crop) { // Created 
        return res.status(201).json({ message: 'New crop type created' })
    } else {
        return res.status(400).json({ message: 'Invalid crop type data received' })
    }
})

// @desc Update crops
// @route PATCH /crops
// @access Private

const updateCrop = asyncHandler(async (req, res) => {

    const {id, name, qualifier, description, daysUntilMature } = req.body

    if ( !id || !name || !typeof daysUntilMature == 'number') {
        return res.status(400).json({ message: "Id, name and days until mature must be supplied"});
    }

    const cropToUpdate = await Crop.findOne({'_id': id}).exec()
    if ( !cropToUpdate ) {
        resturn.res.status('400').json({message: "The crop type was not found"})
    }

    cropToUpdate.name = name
    cropToUpdate.qualifier = qualifier
    cropToUpdate.description = description
    cropToUpdate.daysUntilMature = daysUntilMature

    result = await cropToUpdate.save()
    res.status(200).json({message: `Crop type ${result._id} updated`})

})

// @desc Delete a crop type
// @route DELETE /crops
// @access Private 

const deleteCrop = asyncHandler( async ( req, res ) => {

    const { id } = req.body

     // Confirm data
     if (!id) {
        return res.status(400).json({ message: 'Crop type ID required' })
    }

    // Confirm crop type record exists to delete 
    const crop = await Crop.findById(id).exec()

    if (!crop) {
        return res.status(400).json({ message: `Crop type ${id} not found` })
    }

    const result = await Crop.deleteOne()
    console.log(result)

    const reply = `Crop deleted`

    res.json(reply)
})

module.exports = {
    getAllCrops,
    createCrop,
    updateCrop,
    deleteCrop
}
