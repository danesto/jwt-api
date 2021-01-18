const mongoose = require('mongoose');
const { Schema } = mongoose;

// Model for users collection
const UsersSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true 
    }
});

module.exports = mongoose.model("User", UsersSchema);