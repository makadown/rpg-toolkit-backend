/*jshint esversion: 6 */
var express = require('express');
var app = express();
/* At this stage we will only implement consulting methods */
var HeroRaceModel = require('../models/race');

app.get('/:id', (req, res) => {
    var id = req.params.id;
    HeroRaceModel.findById(id)
        .exec((err, race) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error searching race',
                    errors: err
                });
            }
            if (!race) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'race id ' + id + ' does not exist ',
                    errors: {
                        message: 'There is no race with that ID '
                    }
                });
            }
            res.status(200).json({
                ok: true,
                race: race
            });
        });
});

app.get('/', (req, res, next) => {

    HeroRaceModel.find({})
        .sort('name')
        .exec(
            (err, races) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error loading races.',
                        errors: err
                    });
                }
                // collection.count is deprecated
                HeroRaceModel.countDocuments({}, (err, raceCount) => {
                    res.status(200).json({
                        ok: true,
                        races: races,
                        raceCount: raceCount
                    });
                });
            });
});


module.exports = app;