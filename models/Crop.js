const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)

const cropSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    qualifier: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    daysUntilMature: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Crop', cropSchema)