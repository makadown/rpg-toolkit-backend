/* This is only used when randomizing heros last name */

/*jshint esversion: 6 */
var express = require('express');
var app = express();
/* At this stage we will only implement consulting methods */
var LastNameModel = require('../models/lastname');

app.get('/:id', (req, res) => {
    var id = req.params.id;
    LastNameModel.findById(id)
        .exec((err, lastname) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error searching lastname',
                    errors: err
                });
            }
            if (!lastname) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'lastname id ' + id + ' does not exist ',
                    errors: {
                        message: 'There is no lastname with that ID '
                    }
                });
            }
            res.status(200).json({
                ok: true,
                lastname: lastname
            });
        });
});

app.get('/', (req, res, next) => {

    LastNameModel.find({})
        .sort('name')
        .exec(
            (err, lastnames) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error loading lastnamees.',
                        errors: err
                    });
                }
                // collection.count is deprecated
                LastNameModel.countDocuments({}, (err, lastnameCount) => {
                    res.status(200).json({
                        ok: true,
                        lastnames: lastnames,
                        lastnameCount: lastnameCount
                    });
                });
            });
});


module.exports = app;