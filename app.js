var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

// Mongoose setup
var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/bimlab');

// Passport setup
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

app.use(session({secret: 'asdklasjkfhgsdkjfhgasdkjfhgasdkfhbasdfhjkasdvfa'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/ckeditor')); // redirect JS ckeditor
app.use('/js', express.static(__dirname + '/node_modules/handlebars/dist')); // redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// View routes
var index = require('./routes/index');
var admin = require('./routes/admin');
app.use('/', index);
app.use('/admin', admin.router);
admin.passport(app, passport);

// API routes
var articles = require('./routes/api/articles');
var configs = require('./routes/api/configs');
var users = require('./routes/api/users');
var api = require('./routes/api/index');
app.use('/api', api);
app.use('/api/articles', articles);
app.use('/api/configs', configs);
app.use('/api/users', users);
api.passport(app, passport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
