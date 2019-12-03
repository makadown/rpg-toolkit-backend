/*  This is for a whole monster structure.  */

/*jshint esversion: 6 */
var express = require('express');
var app = express();
/* At this stage we will only implement consulting methods */
var MonsterModel = require('../models/monster');
var MonsterRaceModel = require('../models/monsterrace');

app.get('/:id', (req, res) => {
    var id = req.params.id;
    MonsterModel.findById(id)
        .populate('monsterrace')
		.populate('abilities')
        .exec((err, monster) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error searching monster',
                    errors: err
                });
            }
            if (!monster) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'monster id ' + id + ' does not exist ',
                    errors: {
                        message: 'There is no monster with that ID '
                    }
                });
            }
            res.status(200).json({
                ok: true,
                monster: monster
            });
        });
});

/*  This will return ALL monsters, including deleted ones. 
    I will validate to not show deleted records in the frontend.
    This may will be changed in a future  */
app.get('/', (req, res, next) => {

    MonsterModel.find({})
        .sort('name')
        .populate('monsterrace')
		.populate('abilities')
        .exec(
            (err, monsters) => {
				
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error loading monsters',
                        errors: err
                    });
                }

                MonsterModel.countDocuments({}, (err, monsterCount) => {
                    res.status(200).json({
                        ok: true,
                        monsters: monsters,
                        monsterCount: monsterCount
                    });
                });
            });

});

// Create new Monster
app.post('/', (req, res) => {

    var body = req.body;

    var monster = new MonsterModel({
        picture: body.picture,
        name: body.name,
        level: 1,
        monsterrace: body.monsterrace,
        abilities: body.abilities,
        str: body.str,
        int: body.int,
        dex: body.dex,
        deleted: false
    });

    monster.save((err, monsterSaved) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error creating monster.',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            monster: monsterSaved
        });
    });
});

// Update MonsterModel 
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    MonsterModel.findById(id, (err, monster) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error searching monster.',
                errors: err
            });
        }

        // no monster or deleted (softly) monster
        if (!monster || monster.deleted) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Theres no monster with id ' + id + '.',
                errors: { message: 'No existe monster con ese ID' }
            });
        }

        monster.picture = body.picture;
        monster.name = body.name;
        monster.monsterrace = body.monsterrace;
        monster.abilities = body.abilities;
        monster.str = body.str;
        monster.int = body.int;
        monster.dex = body.dex;

        monster.save((err, monsterSaved) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error updating monster with id ' + id + '.',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                monster: monsterSaved
            });

        });

    });
});

// Soft Delete
app.delete('/:id', (req, res) => {

    var id = req.params.id;

    MonsterModel.findById(id, (err, monster) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error searching monster.',
                errors: err
            });
        }

        // no monster or deleted (softly) monster
        if (!monster || monster.deleted) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Theres no monster with id ' + id + '.',
                errors: { message: 'No existe monster con ese ID' }
            });
        }

        monster.deleted = true;
        monster.save((err, monsterDeleted) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error updating monster with id ' + id + '.',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                monster: monsterDeleted
            });

        });

    });
});

module.exports = app;