/*  This is for a whole hero structure.  */

/*jshint esversion: 6 */
var express = require('express');
var app = express();
/* At this stage we will only implement consulting methods */
var HeroModel = require('../models/hero');

app.get('/:id', (req, res) => {
    var id = req.params.id;
    HeroModel.findById(id)
        .populate('race')
        .populate('class')
        .populate('weapon')
        .exec((err, heroe) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error searching heroe',
                    errors: err
                });
            }
            if (!heroe) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'heroe id ' + id + ' does not exist ',
                    errors: {
                        message: 'There is no heroe with that ID '
                    }
                });
            }
            res.status(200).json({
                ok: true,
                heroe: heroe
            });
        });
});


app.get('/', (req, res, next) => {
    
	 /* TODO: Theres a bug here, if theres 0 
				  documents in collection this will crash. Still figuring out why.
			 This happens in all catalogs.
 				*/
    HeroModel.find({ deleted: false })
        .sort('firstname')
        .populate('race')
        .populate('class')
        .populate('weapon')
        .exec(
            (err, heroes) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error loading heroes',
                        errors: err
                    });
                }

				/* TODO: 
				  theres a bug here, if i put a filter {deleted: false} this will crash. 
				  Still figuring out why. This also happens in monster catalog.
 				*/
                HeroModel.countDocuments({}, (err, heroeCount) => {
                    res.status(200).json({
                        ok: true,
                        heroes: heroes,
                        heroeCount: heroeCount
                    });
                });
            });

});

// Create new Hero
app.post('/', (req, res) => {

   // console.log(req.body);
	
    var body = req.body;

    var hero = new HeroModel({
        firstname: body.firstname,
        lastname: body.lastname,
        level: 1,
        race: body.race,
        class: body.$class,
        weapon: body.weapon,
        str: body.str,
        int: body.int,
        dex: body.dex,
        deleted: false
    });

    hero.save((err, heroSaved) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error creating hero.',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            hero: heroSaved
        });
    });
});

// Update HeroModel 
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    HeroModel.findById(id, (err, heroe) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error searching heroe.',
                errors: err
            });
        }

        // no hero or deleted (softly) hero
        if (!heroe || heroe.deleted) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Theres no heroe with id ' + id + '.',
                errors: { message: 'No existe heroe con ese ID' }
            });
        }

        heroe.firstname = body.firstname;
        heroe.lastname = body.lastname;
        heroe.race = body.race;
		/* had to make this field in angular to begin with an $ because a problem with the reserved word "class" */
        heroe.class = body.$class;
        heroe.weapon = body.weapon;
        heroe.str = body.str;
        heroe.int = body.int;
        heroe.dex = body.dex;

        heroe.save((err, heroeSaved) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error updating heroe with id ' + id + '.',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                heroe: heroeSaved
            });

        });

    });
});

// Soft Delete
app.delete('/:id', (req, res) => {

    var id = req.params.id;

    HeroModel.findById(id, (err, heroe) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error searching heroe.',
                errors: err
            });
        }

        // no hero or deleted (softly) hero
        if (!heroe || heroe.deleted) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Theres no heroe with id ' + id + '.',
                errors: { message: 'No existe heroe con ese ID' }
            });
        }

        heroe.deleted = true;
        heroe.save((err, heroeDeleted) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error updating heroe with id ' + id + '.',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                heroe: heroeDeleted
            });

        });

    });
});

module.exports = app;