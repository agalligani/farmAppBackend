const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)

const areaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Area', areaSchema)