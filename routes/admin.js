var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET Api doc. */
router.get('/', function (req, res, next) {
    res.render('admin/index', {
        title: 'BIM Labs API'
    });
});

router.get('/login', function (req, res, next) {
    res.render('admin/login', {
        message: req.flash('loginMessage')
    });
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/admin/index',
    failureRedirect: '/admin/login',
    failureFlash: true
}));

module.exports = router;
