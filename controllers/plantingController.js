const Planting = require('../models/Planting')
const Area = require('../models/Area')
const Crop = require('../models/Crop')
const asyncHandler = require('express-async-handler')

// @desc Get all plantings
// @route GET plantings
// @access Private 

const getAllPlantings = asyncHandler( async (req, res) => {
    //Get all plantings
    const plantings = await Planting.find().lean()

    //If no plantings
    if(!plantings?.length) {
        return res.status(400).json({ message: 'No plantings found'})
    }

    // Add areatitle to each planting before sending the response
    // See Promise.all with map(): https://youtu.be/4lqJBBEpjRE 
    const plantingsWithArea = await Promise.all(plantings.map(async (planting) => {
        const area = await Area.findById(planting.area).lean().exec()
        return { ...planting, areatitle: area.title }
    }))

    const plantingsWithAreaAndCrop = await Promise.all(plantingsWithArea.map(async (planting) => {
        const crop = await Crop.findById(planting.crop).lean().exec()
        return { ...planting, cropname: crop.name }
    }))

    return res.status(200).json(plantingsWithAreaAndCrop)
})

// @desc Create a planting
// @route POST plantings 
// @access Private 

const createPlanting = asyncHandler( async ( req, res ) => {

    const {
        season,
        area,
        crop,
        plantingDate,
        spacing,
        beds,
        daysUntilMature,
        estimatedHarvest,
        bedLength,
        rowsPerBed,
        plantsNeeded,
        traySize,
        traysNeeded,
        daysIndoor,
        sowingDate,
        fertilizerType,
        active} = req.body

    if( !season || !area || !crop) {
        return res.status(400).json({ message: "At least season, area, & crop must be supplied"});
    }

    const c = await Crop.findOne({"_id":crop}).lean().exec()
    if(!c) {
        return res.status(409).json("Bad request. Crop does not exist")
    }
    console.log( "Crop id:" + crop );

    const plantingObject = { season,
        area,
        crop,
        plantingDate,
        spacing,
        beds,
        daysUntilMature,
        estimatedHarvest,
        bedLength,
        rowsPerBed,
        plantsNeeded,
        traySize,
        traysNeeded,
        daysIndoor,
        sowingDate,
        fertilizerType,
        active}

    const result = Planting.create(plantingObject)

    res.status(200).json({ message: "Planting added"})
})

// @desc Update a planting
// @route  plantings 
// @access Private 

const updatePlanting = asyncHandler( async ( req, res ) => {

    const {id,
        season,
        area,
        crop,
        plantingDate,
        spacing,
        beds,
        daysUntilMature,
        estimatedHarvest,
        bedLength,
        rowsPerBed,
        plantsNeeded,
        traySize,
        traysNeeded,
        daysIndoor,
        sowingDate,
        fertilizerType,
        active} = req.body

    if( !id || !season || !area || !crop )
        // spacing,
        // beds,
        // daysUntilMature,
        // estimatedHarvest,
        // bedLength,
        // rowsPerBed,
        // plantsNeeded,
        // traySize,
        // traysNeeded,
        // daysIndoor,
        // sowingDate,
        // fertilizerType,
        // active) 
        {
        return res.status(400).json({message: 'Critical fields missing - cannot update planting.'})
    }

    const foundArea = await Crop.findOne({ "_id": area }).lean().exec()
    if( !foundArea ) {
        return res.status(400).json({message: 'No areas match this update request'})
    }

    const foundCrop = await Crop.findOne({ "_id": crop }).lean().exec()
    if( !foundCrop ) {
        return res.status(400).json({message: 'No crops match this update request'})
    }

    const plantingToUpdate = await Planting.findOne({"_id": id}).exec()
    if ( !plantingToUpdate ) {
        return res.status(400).json({message: "The planting id supplied doesn't match any existing plantings"})
    }

    plantingToUpdate.id = id
    plantingToUpdate.season = season
    plantingToUpdate.crop = crop
    plantingToUpdate.plantingDate = plantingDate
    plantingToUpdate.spacing = spacing
    plantingToUpdate.beds = beds
    plantingToUpdate.daysUntilMature = daysUntilMature
    plantingToUpdate.estimatedHarvest = estimatedHarvest
    plantingToUpdate.bedLength = bedLength
    plantingToUpdate.rowsPerBed = rowsPerBed
    plantingToUpdate.plantsNeeded = plantsNeeded
    plantingToUpdate.traySize = traySize
    plantingToUpdate.traysNeeded = traysNeeded
    plantingToUpdate.daysIndoor = daysIndoor
    plantingToUpdate.sowingDate = sowingDate
    plantingToUpdate.fertilizerType = fertilizerType
    plantingToUpdate.active = active

    result = await plantingToUpdate.save()
    res.status(200).json({message: `Planting ${result._id} has been successfully updated`})

})


// @desc Delete a planting
// @route DELETE plantings 
// @access Private 

const deletePlanting = asyncHandler( async ( req, res ) => {

    const { id } = req.body

     // Confirm data
     if (!id) {
        return res.status(400).json({ message: 'Planting ID required' })
    }

    // Confirm planting exists to delete 
    const planting = await Planting.findById(id).exec()

    if (!planting) {
        return res.status(400).json({ message: 'Planting not found' })
    }


    const result = await planting.deleteOne()


    const reply = `Planting deleted`

    res.json(reply)

})

module.exports = {
    getAllPlantings,
    createPlanting,
    deletePlanting
}
