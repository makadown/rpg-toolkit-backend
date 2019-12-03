var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var firstnameSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] }
}, { collection: 'firstnames' });

module.exports = mongoose.model('FirstName', firstnameSchema);