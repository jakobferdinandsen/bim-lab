var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/bimlab');

var Config = require('../models/config');
var Article = require('../models/article');
var User = require('../models/user');


// Insert standard user
User.find(function (err, users) {
    if (users.length < 1) {
        var user = new User();
        user.active = true;
        user.email = "admin";
        user.password = user.generateHash('admin');
        user.save(function (err) {
            if (err) {
                console.log('Couldnt insert standard login. ' + err);
            }
            process.exit();
        });
    } else {
        process.exit();
    }
});
