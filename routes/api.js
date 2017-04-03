var express = require('express');
var router = express.Router();

/* GET Api doc. */
router.get('/', function(req, res, next) {
    res.render('api/index', {

    });
});

module.exports = router;
