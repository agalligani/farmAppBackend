const { text } = require('express')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)

const plantingSchema = new mongoose.Schema({
    season: {
        type: Number,
        required: true
    },
    area: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Area'
    },
    crop: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Crop'
    },
    plantingDate: {
        type: Date
    },
    method: {
        type: String,
        default: 't'
    },
    spacing: {
        type: Number,
        default: 12
    },

    beds: {
        type: Number,
        default: 0
    },

    daysUntilMature: {
        type: Number,
        default: 0
    },
    estimatedHarvest: {
        type: Date
    },
    bedLength: {
        type: Number,
        default: 0
    },
    rowsPerBed: {
        type: Number,
        default: 0
    },
    plantsNeeded: {
        type: Number,
        default: 0
    },
    traySize: {
        type: Number,
        default: 0
    },
    traysNeeded: {
        type: Number,
        default: 0
    },
    daysIndoor: {
        type: Number,
        default: 0
    },
    sowingDate: {
        type: Date
    },
    fertilizerType: {
        type: String,
        default: "None"
    },
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Planting', plantingSchema)