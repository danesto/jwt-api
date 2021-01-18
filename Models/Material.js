const mongoose = require('mongoose');
const { Schema } = mongoose;

//Model for materials collection
const MaterialSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Material', MaterialSchema);