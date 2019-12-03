/* This is only used when randomizing hero names */
/*jshint esversion: 6 */
var express = require('express');
var app = express();
/* At this stage we will only implement consulting methods */
var FirstNameModel = require('../models/firstname');

app.get('/:id', (req, res) => {
    var id = req.params.id;
    FirstNameModel.findById(id)
        .exec((err, firstname) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error searching firstname',
                    errors: err
                });
            }
            if (!firstname) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'firstname id ' + id + ' does not exist ',
                    errors: {
                        message: 'There is no firstname with that ID '
                    }
                });
            }
            res.status(200).json({
                ok: true,
                firstname: firstname
            });
        });
});

app.get('/', (req, res, next) => {

    FirstNameModel.find({})
        .sort('name')
        .exec(
            (err, firstnames) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error loading firstnamees.',
                        errors: err
                    });
                }
                // collection.count is deprecated
                FirstNameModel.countDocuments({}, (err, firstnameCount) => {
                    res.status(200).json({
                        ok: true,
                        firstnames: firstnames,
                        firstnameCount: firstnameCount
                    });
                });
            });
});


module.exports = app;