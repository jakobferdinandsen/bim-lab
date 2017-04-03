// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/bimlab');
var Article = require('./app/models/article');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
router.use(function (req, res, next) {
    console.log(req.url);
    next();
});

router.route('/articles')
    .post(function (req, res) {
        var article = new Article();
        article.active = 1;
        article.header = req.body.header;
        article.body = req.body.body;
        article.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({
                message: 'Article created!'
            });
        });
    })
    .get(function (req, res) {
        Article.find(function (err, articles) {
            if (err) {
                res.send(err);
            }
            res.json(articles);
        });
    });

router.route('/articles/:article_id')
    .get(function (req, res) {
        Article.findById(req.params.article_id, function (err, article) {
            if (err) {
                res.send(err);
            }
            res.json(article);
        });
    })
    .put(function (req, res) {
        Article.findById(req.params.article_id, function (err, article) {
            if (err) {
                res.send(err);
            }
            if (req.body.header !== "") {
                article.header = req.body.header;
            }
            if (req.body.body !== "") {
                article.body = req.body.body;
            }
            article.save(function (err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'Article update!' })
            })
        });
    })
    .delete(function (req, res) {
        Article.findById(req.params.article_id, function (err, article) {
            if (err) {
                res.send(err);
            }
            article.save(function (err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'Article deactivated!'});
            });
        });
    });

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);