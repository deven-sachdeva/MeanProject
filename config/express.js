var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

module.exports = function() {
    var app = express();
	
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	
	app.set('views', './app/views');
	app.set('view engine', 'ejs');
	
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'ThisSiteFirstCookie'
	}));
	
	app.use(passport.initialize());
	app.use(passport.session());
	
	app.use(flash());
	
	require('../app/routes/routes.js')(app);
                  app.use(express.static('./public'));
	
	return app;
};