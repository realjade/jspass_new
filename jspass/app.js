var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var config = require('./configure.js');
var routes = require('./routes/index');
var course = require('./routes/course');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('keyboard cat'));
// 设置 Session
app.use(session({
    store: new RedisStore({
        host: "127.0.0.1",
        port: 6379,
        db: "0",
        prefix: "user-"
    }),
    secret: 'keyboard cat',
    cookie:{
        originalMaxAge: 6000,
        maxAge: 6000
    }
}));
app.use(express.static(path.join(__dirname, 'static')));

//把user从session中读取出来，然后设置到res的locals中去
app.use(function(req, res, next) {
    var session = req.session,
        user = session.user;
    if(user){
        res.locals._user =  user;
    }
    next();
});



app.use('/', routes);
app.use('/course', course);
app.use('/users', users);



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log('404');
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log('500');
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
