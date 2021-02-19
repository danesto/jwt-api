const e = require('express');
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

exports.filterByDate = async (req, res, next) => {
    const dateFrom = req.body.dateFrom;
    const dateTo = req.body.dateTo;

    try {
        if(dateTo == null || dateTo == '') {
            // console.log(dateFrom);
            let dateArray = dateFrom.split('-');
            const formatedDate = new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(dateArray[2]) + 1);

            const reservationsWithoutEndDate = await Reservation.find({dateReserved: formatedDate});
            return res.json({
                data: reservationsWithoutEndDate
            });   
        } else if (dateFrom == null || dateFrom == '') {
            return res.json({
                message: "Datum od mora biti unet!"
            });
        } else {
            let dateFromArray = dateFrom.split('-');
            const formatedDateFrom = new Date(parseInt(dateFromArray[0]),parseInt(dateFromArray[1]) - 1,parseInt(dateFromArray[2]) + 1);
            let dateToArray = dateTo.split('-');
            const formatedDateTo = new Date(parseInt(dateToArray[0]),parseInt(dateToArray[1]) - 1,parseInt(dateToArray[2]) + 1);

            const filteredReservations = await Reservation.find({dateReserved: {$gte: formatedDateFrom, $lt: formatedDateTo}});
            //return an object of filtered by dates
            return res.json({
                data: filteredReservations
            });   
        }
    } catch(err) {
        console.log(err);
        res.json({
            message: err
        })
    }
};


exports.searchReservations = async (req, res, next) => {
    let searchInput = req.body.searchBox;
    try {
        if(typeof(searchInput) == 'string') {
            let searchResult = await Reservation.find({office: searchInput});
            res.json({
                data: searchResult
            })
        } else {
            return res.json({
                message: 'Uneti sadrzaj nije tekst!'
            })
        }
    } catch (err) {
        console.error(err);
    }
}

exports.deleteResevations = async (req, res) => {
    const {ids} = req.body;
    // console.log(ids);
    await Reservation.deleteMany(
      {
        _id: {$in: ids},
      })

    return res.json({
        message: 'Rezervacije je uspešno izbrisana'
    });
}