/*jshint esversion: 6 */
var express = require('express');
var app = express();
/* At this stage we will only implement consulting methods */
var MonsterPowerModel = require('../models/monsterpower');

app.get('/:id', (req, res) => {
    var id = req.params.id;
    MonsterPowerModel.findById(id)
        .exec((err, monsterpower) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error searching monsterpower',
                    errors: err
                });
            }
            if (!monsterpower) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'monsterpower id ' + id + ' does not exist ',
                    errors: {
                        message: 'There is no monsterpower with that ID '
                    }
                });
            }
            res.status(200).json({
                ok: true,
                monsterpower: monsterpower
            });
        });
});

app.get('/', (req, res, next) => {

    MonsterPowerModel.find({})
        .sort('name')
        .exec(
            (err, monsterpowers) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error loading monsterpowers.',
                        errors: err
                    });
                }
                // collection.count is deprecated
                MonsterPowerModel.countDocuments({}, (err, monsterpowerCount) => {
                    res.status(200).json({
                        ok: true,
                        monsterpowers: monsterpowers,
                        monsterpowerCount: monsterpowerCount
                    });
                });
            });
});


module.exports = app;