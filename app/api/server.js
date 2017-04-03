var express = require('express');
var app = express();
var fs = require("fs");
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var dbUrl = 'mongodb://mongo:27017/bim-lab';

//Create article
app.post('/article', function (req, res) {
    var article = {
        header: "This is a header",
        body: "This is a body",
        picture: "picture placeholder"
    };

    MongoClient.connect(dbUrl, function(err, db) {
        var collection = db.collection('documents');
        collection.insertOne(article, function(err, result) {
            db.close();
            res.end(article.toString());
        });
    });
});

app.get('/article', function (req, res) {
    MongoClient.connect(dbUrl, function(err, db) {
        var collection = db.collection('documents');
        collection.find().toArray(function (err, docs) {
            db.close();
            console.log(docs);
            res.end(docs.toString());
        });
    });
});

app.listen(8080);