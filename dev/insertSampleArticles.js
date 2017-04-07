var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/bimlab');

var Config = require('../models/config');
var Article = require('../models/article');
var User = require('../models/user');


var article = new Article();
article.header = "Sample header is sample";
article.body = "Sambe body is also sample body";
article.save(function (err) {
    if (err) {
        console.log('Couldnt insert standard login. ' + err);
    }
    process.exit();
});
