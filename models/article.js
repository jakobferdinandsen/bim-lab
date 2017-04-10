var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ArticleSchema = new Schema({
    active: Boolean,
    header: String,
    body: String,
    img: Buffer
});

module.exports = mongoose.model('Article', ArticleSchema);