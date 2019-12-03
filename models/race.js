var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var raceSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] }
}, { collection: 'races' });

module.exports = mongoose.model('Race', raceSchema);