var express = require('express');
var router = express.Router();
var config = require('../models/config');
var article = require('../models/article');

/* GET home page. */
router.get('/', function (req, res, next) {
    config.findOne({name: 'selectedArticle'}, function (err, config) {
        article.findOne({_id: config.value}, function (err, article) {
            res.render('index', {
                title: 'BIM Lab',
                articleHeader: article.header,
                articleBody: article.body,
                articleImage: 'https://upload.wikimedia.org/wikipedia/en/timeline/fe8adfad0b276ed3a6e90ce75db72f26.png'
            });
        });
    });
});

module.exports = router;
