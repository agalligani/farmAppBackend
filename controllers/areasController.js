const Area = require('../models/Area')
const asyncHandler = require('express-async-handler')

// @desc Get all areas
// @route GET /areas
// @access Private

const getAllAreas = asyncHandler(async (req, res) => {

    const areas = await Area.find().select().exec()
    if (!areas) {
        return res.status(400).json({message: 'No areas found'})
    }
    
    res.json(areas)
})

// @desc Create new area
// @route POST /areas
// @access Private

const createArea = asyncHandler(async (req, res) => {

    const {title, description, active } = req.body

    if ( !title || !description || !active ) {
        return res.status(400).json({ message: "All fields must be supplied"});
    }

    if (!typeof active == "boolean") {
        return res.status(400).json({ message: "Active must be a Boolean value"});
    }

    const areaObject = { title, description, active }
    const area = await Area.create(areaObject)

    if (area) { // Created 
        return res.status(201).json({ message: 'New area created' })
    } else {
        return res.status(400).json({ message: 'Invalid area data received' })
    }
})

// @desc Update area
// @route PATCH /areas
// @access Private

const updateArea = asyncHandler(async (req, res) => {

    const {id, title, description, active } = req.body

    if ( !id || !title || !description || !active || ! typeof active == 'boolean') {
        return res.status(400).json({ message: "All fields must be supplied"});
    }

    const areaToUpdate = await Area.findOne({'_id': id}).exec()
    if ( !areaToUpdate ) {
        resturn.res.status('400').json({message: "The note was not found"})
    }

    areaToUpdate.title = title
    areaToUpdate.description = description
    areaToUpdate.active = active

    result = await areaToUpdate.save()
    res.status(200).json({message: `Area ${result._id} updated`})

})

// @desc Delete a note
// @route DELETE notes 
// @access Private 

const deleteArea = asyncHandler( async ( req, res ) => {

    const { id } = req.body

     // Confirm data
     if (!id) {
        return res.status(400).json({ message: 'Area ID required' })
    }

    // Confirm area exists to delete 
    const area = await Area.findById(id).exec()

    if (!area) {
        return res.status(400).json({ message: 'Area not found' })
    }

    const result = await area.deleteOne()

    const reply = `Area '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
})


module.exports = {
    getAllAreas,
    createArea,
    updateArea,
    deleteArea
}
