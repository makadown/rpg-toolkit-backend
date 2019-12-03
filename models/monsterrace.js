var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var monsterraceSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] }
}, { collection: 'monsterraces' });

module.exports = mongoose.model('MonsterRace', monsterraceSchema);