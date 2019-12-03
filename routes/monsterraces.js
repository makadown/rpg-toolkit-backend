/*jshint esversion: 6 */
var express = require('express');
var app = express();
/* At this stage we will only implement consulting methods */
var MonsterRaceModel = require('../models/monsterrace');

app.get('/:id', (req, res) => {
    var id = req.params.id;
    MonsterRaceModel.findById(id)
        .exec((err, monsterrace) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error searching monsterrace',
                    errors: err
                });
            }
            if (!monsterrace) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'monsterrace id ' + id + ' does not exist ',
                    errors: {
                        message: 'There is no monsterrace with that ID '
                    }
                });
            }
            res.status(200).json({
                ok: true,
                monsterrace: monsterrace
            });
        });
});

app.get('/', (req, res, next) => {

    MonsterRaceModel.find({})
        .sort('name')
        .exec(
            (err, monsterraces) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error loading monsterraces.',
                        errors: err
                    });
                }
                // collection.count is deprecated
                MonsterRaceModel.countDocuments({}, (err, monsterraceCount) => {
                    res.status(200).json({
                        ok: true,
                        monsterraces: monsterraces,
                        monsterraceCount: monsterraceCount
                    });
                });
            });
});


module.exports = app;