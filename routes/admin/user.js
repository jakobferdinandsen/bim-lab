var express = require('express');
var router = express.Router();

/* GET Api doc. */
router.get('/login', function(req, res, next) {
    res.render('admin/login', {
        title: 'BIM Labs Admin interface',
        message: req.flash('loginMessage')
    });
});

router.post('/login', function () {
    //TODO
});

router.get('/profile', isLoggedIn, function(req, res) {
    res.render('admin/profile', {
        user : req.user // get the user out of session and pass to template
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = router;
