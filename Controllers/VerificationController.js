const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../Models/User');

exports.getUser = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    
    // Validation and query
    if(username == '' || password == '' || username == undefined || password == undefined) {
        res.json({
            message: "Username and password are required"
        })
    } else {
        const user = await User.findOne({username: username, password: password}).exec();

        if(!user) {  
            res.json({
                message: "User with provided username or password doesn't exist"
            });
        } else {
            jwt.sign({user}, 'password', (err, token) => {
                res.json({token,err});
            });
        }
    }
}

exports.verifyToken = (req, res, next) => {
    //Make a authorization header which hold the bearer token
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== undefined) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        // Save token in request object so it can be used in other methods and functions
        req.token = bearerToken;

        next();
    } else {
        res.sendStatus(403);
    }

}