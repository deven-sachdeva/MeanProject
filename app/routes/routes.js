var commentController = require('../controllers/comment.controller'),
	basicController = require('../controllers/basic.controller');
var passport = require('passport');

module.exports = function(app){
	app.route('/').
		get(basicController.renderHome);
		
	app.route('/login').
		get(basicController.renderLogin).
		post(passport.authenticate('local', {
			successRedirect : '/comments',
			failureRedirect : '/login',
			failureFlash: true
		}));
	
	app.route('/register').
		get(basicController.renderRegister).
		post(basicController.register);
	
	app.route('/comments').
		get(commentController.renderPage).
		post(commentController.create);
		
	app.route('/logout').
		get(basicController.logout);
};