const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Leave = require('../Models/Leave');

exports.getAllLeaves = async (req, res) => {
    try {
        jwt.verify(req.token, 'password', (err) => {
            if(err) {
                const statusError = res.sendStatus(403);
                res.json({
                    message:statusError
                });
            } else {
                Leave.find()
                .exec()
                .then(leaves => {
                    res.json(leaves)
                })
                .catch(err => {
                    console.log(err);
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
}

exports.addNewLeave = async (req, res) => {
//Verify is token is valid and return data of endpoint
jwt.verify(req.token, 'password', (err, authData) => {
    if(err) {
        const statusError = res.sendStatus(403);
        res.json({
            message:"You don't have a permission!",
            statusCode: statusError
        });
    } else {
        const leaves = new Leave({
            _id: new mongoose.Types.ObjectId(),
            employee: req.body.employee,
            dateFrom: req.body.dateFrom,
            dateTo: req.body.dateTo,
        });

        leaves
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });

        res.json({
            message: "Leave added to database",
            leaveAdded: leaves,
            statusCode: 200
        })
    }
})
}

exports.deleteLeave = (req, res) => {
    const id = req.params.id;
    Leave.deleteOne({_id: id}).then(result => {
        res.json({
            message: "Leave deleted",
            statusCode: 200
        })
    }).catch(err => {
        console.log(err);
    })
}