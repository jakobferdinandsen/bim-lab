var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var Config = require('../models/config');

/* GET Api doc. */
router.get('/', isLoggedIn, function (req, res, next) {
    Config.findOne({name: 'selectedArticle'}, function (err, config) {
        if (config === null) {
            Article.find(function (err, articles) {
                res.render('admin/index', {
                    title: 'BIM Labs Admin interface',
                    articles: articles
                });
            });
        } else {
            Article.findOne({_id: config.value}, function (err, article) {
                Article.find({active: true}, function (err, articles) {
                    var filteredArticles = articles.filter(function (arrayArticle) {
                        return String(arrayArticle._id) !== String(article._id);

                    });
                    res.render('admin/index', {
                        title: 'BIM Labs Admin interface',
                        selectedArticle: article,
                        articles: filteredArticles
                    });
                });
            });
        }
    });
});

router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/admin/login');
});

module.exports.router = router;
module.exports.passport = function (app, passport) {
    router.get('/login', function (req, res, next) {
        res.render('admin/login', {
            message: req.flash('loginMessage')
        });
    });

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/admin/',
        failureRedirect: '/admin/login',
        failureFlash: true
    }));
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admin/login');
}