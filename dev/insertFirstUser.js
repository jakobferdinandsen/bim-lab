var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/bimlab');

var User = require('../models/user');
var Crypto = require('crypto');


// Insert standard user
User.find(function (err, users) {
    if (users.length < 1) {
        var user = new User();
        user.active = true;
        user.email = "admin";
        user.password = user.generateHash('admin');
        user.apikey = Crypto.randomBytes(10).toString('hex');
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
