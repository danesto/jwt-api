const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Office = require('../Models/Office');

exports.getAllOffices = (req, res, next) => {
    jwt.verify(req.token, 'password', (err) => {
        if(err) {
            const statusError = res.sendStatus(403);
            res.json({
                message:statusError
            });
        } else {
            Office.find()
            .exec()
            .then(offices => {
                res.json(offices)
            })
            .catch(err => {
                console.log(err);
            })
        }
    })
}
   
exports.addOffice = (req, res, next) => {
    //Verify is token is valid and return data of endpoint
    jwt.verify(req.token, 'password', (err, authData) => {
        if(err) {
            const statusError = res.sendStatus(403);
            res.json({
                message:"You don't have a permission!",
                statusCode: statusError
            });
        } else {
            const office = new Office({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name
            });

            office
            .save()
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });

            res.json({
                message: "Office added to database",
                officeAdded: office,
                statusCode: 200
            })
        }
    })
}
