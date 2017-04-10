var express = require('express');
var router = express.Router();
var Article = require('../../models/article');
var User = require('../../models/user');

router.use(function (req, res, next) {
    console.log(req.url);
    next();
});

router.route('/')
    .post(isLoggedIn, function (req, res) {
        var article = new Article();
        article.active = 1;
        article.header = req.body.header;
        article.body = req.body.body;
        article.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json(article);
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
                res.json({error: "Article not found"});
                return;
            }
            res.json(article);
        });
    })
    .put(isLoggedIn, function (req, res) {
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
                if (err) {
                    res.send(err);
                }
                res.json(article);
            })
        });
    })
    .delete(isLoggedIn, function (req, res) {
        Article.findById(req.params.article_id, function (err, article) {
            if (err) {
                res.send(err);
            }
            article.active = 0;
            article.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json(article);
            });
        });
    });


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({message: "Authentication required"});
}