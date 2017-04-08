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

router.route('/:config_id')
    .get(function (req, res) {
        Config.findById(req.params.config_id, function (err, config) {
            if (err) {
                res.send(err);
            }
            res.json(config);
        });
    })
    .put(function (req, res) {
        Config.findById(req.params.config_id, function (err, config) {
            if (err) {
                res.send(err);
            }
            if (req.body.name !== "") {
                config.name = req.body.header;
            }
            if (req.body.body !== "") {
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
    .delete(function (req, res) {
        Config.findById(req.params.config_id, function (err, config) {
            if (err) {
                res.send(err);
            }
            config.save(function (err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'Config deactivated!'});
            });
        });
    });

router.route('/:config_name')
    .get(function (req, res) {
        Config.findOne({name: req.params.config_name}, function (err, config) {
            if (err) {
                res.send(err);
            }
            res.json(config);
        });
    })
    .put(function (req, res) {
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
    .delete(function (req, res) {
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