var express = require('express');
var router = express.Router();

/* GET Api doc. */
router.get('/', isLoggedIn, function (req, res, next) {
    res.render('admin/index', {
        title: 'BIM Labs API'
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
        successRedirect: '/admin/#dashboard',
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