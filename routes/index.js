var express = require('express');
var router = express.Router();
var Config = require('../models/config');
var Article = require('../models/article');

/* GET home page. */
router.get('/', function (req, res, next) {
    Config.findOne({name: 'selectedArticle'}, function (err, config) {
        if (config === null) {
            res.render('index', {
                title: 'BIM Lab',
                articleHeader: 'Config not found',
                articleBody: 'Config not found',
                articleImage: 'https://upload.wikimedia.org/wikipedia/en/timeline/fe8adfad0b276ed3a6e90ce75db72f26.png'
            });
            return;
        }
        Article.findOne({_id: config.value}, function (err, article) {
            if (article === null) {
                res.render('index', {
                    title: 'BIM Lab',
                    articleHeader: 'Article not found',
                    articleBody: 'Article not found',
                    articleImage: 'https://upload.wikimedia.org/wikipedia/en/timeline/fe8adfad0b276ed3a6e90ce75db72f26.png'
                });
                return;
            }
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
