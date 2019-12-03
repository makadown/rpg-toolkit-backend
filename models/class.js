var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] }
}, { collection: 'classes' });

module.exports = mongoose.model('Class', classSchema);