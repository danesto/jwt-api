const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Material = require('../Models/Material');
const Reservation = require('../Models/Reservation');

exports.getAllReservations = (req, res, next) =>{
    jwt.verify(req.token, 'password', (err) => {
        if(err) {
            const statusError = res.sendStatus(403);
            res.json({
                message:statusError
            });
        } else {
            Reservation.find()
            .exec()
            .then(reservations => {
                res.json(reservations)
            })
            .catch(err => {
                console.log(err);
            })
        }
    })
};

exports.addNewReservation = (req, res, next) => {
    //Verify is token is valid and return data of endpoint
    jwt.verify(req.token, 'password', (err, authData) => {
        if(err) {
            const statusError = res.sendStatus(403);
            res.json({
                message:"You don't have a permission!",
                statusCode: statusError
            });
        } else {
            const reservation = new Reservation({
                _id: new mongoose.Types.ObjectId(),
                dateReserved: req.body.dateReserved,
                materialName: req.body.materialName,
                office: req.body.office,
                qty: req.body.qty
            });

            reservation
            .save()
            .then(result => {
                console.log(result);
                Material.updateOne({
                    'name':reservation.materialName
                },
                {
                    $inc: { quantity: -reservation.qty} 
                }).then(success =>{
                    console.log(success);
                    res.json({
                        message: "Reservation submited",
                        reseravtionAdded: reservation,
                        statusCode: 200
                    });
                }).catch(error => {
                    console.log(error);
                })
            })
            .catch(err => {
                console.log(err);
            });
        }
    });
}