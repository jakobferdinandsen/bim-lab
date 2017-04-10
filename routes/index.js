var express = require('express');
var router = express.Router();
var Config = require('../models/config');
var Article = require('../models/article');

/* GET home page. */
router.get('/', function (req, res, next) {
    Config.findOne({name: 'selectedArticle'}, function (err, config) {
        if (config === null) {
            config = new Config();
            config.name = 'selectedArticle';
            config.value = "";
            config.save();
        }
        Article.findOne({_id: config.value}, function (err, article) {
            console.log(article);
            if (article === null || article === undefined) {
                article = new Article();
                article.header = "Article not found";
                article.body = "Article not found";
                article.img = "";
            }
            res.render('index', {
                title: 'BIM Lab',
                articleHeader: article.header,
                articleBody: article.body,
                articleImage: article.img
            });
        });
    });
});

module.exports = router;
