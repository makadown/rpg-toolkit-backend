/*jshint esversion: 6 */
var express = require('express');
var app = express();
/* At this stage we will only implement consulting methods */
var HeroClass = require('../models/class');

app.get('/:id', (req, res) => {
    var id = req.params.id;
    HeroClass.findById(id)
        .exec((err, heroClass) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error searching heroClass',
                    errors: err
                });
            }
            if (!heroClass) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'heroClass id ' + id + ' does not exist ',
                    errors: {
                        message: 'There is no heroClass with that ID '
                    }
                });
            }
            res.status(200).json({
                ok: true,
                heroClass: heroClass
            });
        });
});

app.get('/', (req, res, next) => {

    HeroClass.find({})
        .sort('name')
        .exec(
            (err, heroClasses) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error loading heroClasses.',
                        errors: err
                    });
                }
                // collection.count is deprecated
                HeroClass.countDocuments({}, (err, heroClassCount) => {
                    res.status(200).json({
                        ok: true,
                        heroClasses: heroClasses,
                        heroClassCount: heroClassCount
                    });
                });
            });
});


module.exports = app;