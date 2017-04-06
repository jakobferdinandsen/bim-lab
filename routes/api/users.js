var express = require('express');
var router = express.Router();
var User = require('../../models/user');

router.use(function (req, res, next) {
    console.log(req.url);
    next();
});

router.route('/')
    .post(function (req, res) {
        var user = new User();
        user.email = req.body.email;
        user.password = user.generateHash(req.body.password);
        if (!user.email || !user.password){
            res.json({
                message: 'email & password required'
            });
            return;
        }
        user.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({
                message: 'User created!'
            });
        });
    })
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    });

router.route('/:user_id')
    .get(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    })
    .put(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.send(err);
            }
            if (req.body.email !== "") {
                user.email = req.body.email;
            }
            if (req.body.password !== "") {
                user.password = req.body.password;
            }
            user.save(function (err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'User update!' })
            })
        });
    })
    .delete(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.send(err);
            }
            user.save(function (err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'User deactivated!'});
            });
        });
    });


module.exports = router;
