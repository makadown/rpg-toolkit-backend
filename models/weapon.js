var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weaponSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] }
}, { collection: 'weapons' });

module.exports = mongoose.model('Weapon', weaponSchema);