var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var monsterSchema = new Schema({
    picture: [{ type: String }],
    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: [true, 'The name already exist']
    },
    level: {
        type: Number,
        min: 1,
        max: 100,
        unique: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    monsterrace: {
        type: Schema.Types.ObjectId,
        ref: 'MonsterRace',
        required: [true, 'The monsterrace id is required']
    },
    abilities: [{
        type: Schema.Types.ObjectId,
        ref: 'MonsterPower',
        required: [true, 'A monster class id is required']
    }],
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
}, { collection: 'monsters' });
module.exports = mongoose.model('Monster', monsterSchema);