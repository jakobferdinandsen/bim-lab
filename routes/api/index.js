var express = require('express');
var router = express.Router();

/* GET Api doc. */
router.get('/', function (req, res, next) {
    res.render('api/index', {
        title: 'BIM Labs API'
    });
});

module.exports = router;
module.exports.passport = function (app, passport) {
    router.post('/unauthorized');
    router.post('/authenticate', passport.authenticate('local-apikey', {
        failureRedirect: '/unauthorized'
    }), function (req, res) {
        res.json({message: "Authenticated"})
    });
};