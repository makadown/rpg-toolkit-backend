/*jshint esversion: 6 */
var express = require('express');
var app = express();
/* At this stage we will only implement consulting methods */
var WeaponModel = require('../models/weapon');

app.get('/:id', (req, res) => {
    var id = req.params.id;
    WeaponModel.findById(id)
        .exec((err, weapon) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error searching weapon',
                    errors: err
                });
            }
            if (!weapon) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'weapon id ' + id + ' does not exist ',
                    errors: {
                        message: 'There is no weapon with that ID '
                    }
                });
            }
            res.status(200).json({
                ok: true,
                weapon: weapon
            });
        });
});

app.get('/', (req, res, next) => {

    WeaponModel.find({})
        .sort('name')
        .exec(
            (err, weapons) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error loading weapons.',
                        errors: err
                    });
                }
                // collection.count is deprecated
                WeaponModel.countDocuments({}, (err, weaponCount) => {
                    res.status(200).json({
                        ok: true,
                        weapons: weapons,
                        weaponCount: weaponCount
                    });
                });
            });
});


module.exports = app;