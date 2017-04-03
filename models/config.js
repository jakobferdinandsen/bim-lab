var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ConfigSchema = new Schema({
    active: Boolean,
    name: String,
    value: String
});

module.exports = mongoose.model('Config', ConfigSchema);