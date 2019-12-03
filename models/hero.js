var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var heroSchema = new Schema({
    firstname: { type: String, required: [true, 'The first name is required'] },
    lastname: { type: String, required: false },
    level: {
        type: Number,
        min: 1,
        max: 100,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    race: {
        type: Schema.Types.ObjectId,
        ref: 'Race',
        required: [true, 'The hero race id is required']
    },
    class: {
        type: Schema.Types.ObjectId,
            ref: 'Class',
            required: [true, 'The hero class id is required']
    },
    weapon: {
        type: Schema.Types.ObjectId,
        ref: 'Weapon',
        required: [true, 'The weapon id is required']
    },
    str: {
        type: Number,
        min: 0,
        max: 100,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for str'
        }
    },
    int: {
        type: Number,
        min: 0,
        max: 100,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for int'
        }
    },
    dex: {
        type: Number,
        min: 0,
        max: 100,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for dex'
        }
    },
    deleted: { type: Boolean }
}, { collection: 'heroes' });

module.exports = mongoose.model('Hero', heroSchema);