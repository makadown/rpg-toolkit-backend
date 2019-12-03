var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var monsterpowerSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] }
}, { collection: 'monsterpowers' });

module.exports = mongoose.model('MonsterPower', monsterpowerSchema);