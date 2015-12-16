// Enviroment vars
process.env['SECRET'] = 'voting-app-jwt-auth';
process.env['MONGO_URI'] = 'mongodb://localhost/votingApp';

// Require
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
require('./models/User');
require('./models/Poll');
require('./config/passport');

// Connect to database
mongoose.connect(process.env['MONGO_URI']);

// Routes
var routes = require('./routes/index');
var users = require('./routes/users');
var polls = require('./routes/polls');

// Setup app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// Routes middleware
app.use('/', routes);
app.use('/user', users);
app.use('/polls', polls);

app.get('/login/twitter',
	passport.authenticate('twitter'));

app.get('/login/twitter/return',
	passport.authenticate('twitter', {
		failureRedirect: '/user/login'
	}),
	function (req, res) {
		res.redirect('/');
	});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
