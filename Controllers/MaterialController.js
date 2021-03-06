const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Material = require('../Models/Material');

exports.getAllMaterials = (req, res, next) => {
    jwt.verify(req.token, 'password', (err) => {
        if(err) {
            const statusError = res.sendStatus(403);
            res.json({
                message:statusError
            });
        } else {
            Material.find()
            .exec()
            .then(materials => {
                res.json(materials)
            })
            .catch(err => {
                console.log(err);
            })
        }
    })
};

exports.addMaterial = (req, res, next) => {
    //Verify is token is valid and return data of endpoint
    jwt.verify(req.token, 'password', (err, authData) => {
        if(err) {
            const statusError = res.sendStatus(403);
            res.json({
                message:"You don't have a permission!",
                statusCode: statusError
            });
        } else {
            const material = new Material({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                quantity: req.body.quantity,
                description: req.body.description
            });

            material
            .save()
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });

            res.json({
                message: "Material added to database",
                materialAdded: material,
                statusCode: 200
            })
        }
    })
}

exports.getMaterial = (req, res, next) => {
    const id = req.params.id;
    console.log(id);
}

exports.deleteMaterial = (req, res, next) => {
    const id = req.params.id;
    Material.deleteOne({_id: id}).then(result => {
        console.log(result);
        res.json({
            message: "Material deleted",
            statusCode: 200
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.updateMaterial = (req, res) => {
    try{ 
        const id = req.body.id;
        const qty = req.body.qty;
        Material.updateOne({_id: id}, {$set:{quantity: qty}}, function(err) {console.log(err)});
        return res.json({
            message: "Materijal azuriran"
        })
    } catch (err) {
        console.error(err);
    }
}