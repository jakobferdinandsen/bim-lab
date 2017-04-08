var express = require('express');
var router = express.Router();
var Config = require('../../models/config');

router.use(function (req, res, next) {
    console.log(req.url);
    next();
});

router.route('/')
    .post(function (req, res) {
        var config = new Config();
        config.active = 1;
        config.name = req.body.name;
        config.value = req.body.value;
        config.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({
                message: 'Config created!'
            });
        });
    })
    .get(function (req, res) {
        Config.find(function (err, configs) {
            if (err) {
                res.send(err);
            }
            res.json(configs);
        });
    });

router.route('/:config_name')
    .get(isLoggedIn, function (req, res) {
        Config.findOne({name: req.params.config_name}, function (err, config) {
            if (err) {
                res.send(err);
            }
            res.json(config);
        });
    })
    .put(isLoggedIn, function (req, res) {
        Config.findOne({name: req.params.config_name}, function (err, config) {
            if (err) {
                res.send(err);
            }
            if (req.body.value !== "") {
                config.value = req.body.value;
            }
            config.save(function (err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'Config update!' })
            })
        });
    })
    .delete(isLoggedIn, function (req, res) {
        Config.findOne({name: req.params.config_name}, function (err, config) {
            if (err) {
                res.send(err);
            }
            config.active = false;
            config.save(function (err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'Config deactivated!'});
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