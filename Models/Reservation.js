const mongoose = require('mongoose');
const { Schema } = mongoose;

//Model for materials collection
const ReservationSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dateReserved: {
        type: Date,
        required: true
    },
    materialName: {
        type: String,
        required: true
    },
    office: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Reservation', ReservationSchema);