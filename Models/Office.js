const mongoose = require('mongoose');
const { Schema } = mongoose;

//Model for materials collection
const OfficeSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Office', OfficeSchema);