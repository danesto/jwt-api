const mongoose = require('mongoose');
const { Schema } = mongoose;

//Model for materials collection
const LeaveSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employee: {
        type: String,
        required: true
    },
    dateFrom: {
        type: String,
        required: true
    },
    dateTo: {
        type: String,
        require: true
    }
    
})

module.exports = mongoose.model('Leave', LeaveSchema);