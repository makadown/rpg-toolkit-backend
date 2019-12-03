var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lastnameSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] }
}, { collection: 'lastnames' });

module.exports = mongoose.model('LastName', lastnameSchema);