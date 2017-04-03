var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/bimlab');
var Article = require('../../models/article');

router.use(function (req, res, next) {
    console.log(req.url);
    next();
});

router.route('/')
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

router.route('/:article_id')
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


module.exports = router;