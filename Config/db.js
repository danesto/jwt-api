// ENV database parameters
require('dotenv').config();

// databse name
const DB_NAME = process.env.DB_NAME;

//databse login parameters
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const mongoose = require('mongoose');

// DB connection configuration
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ajvcd.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
