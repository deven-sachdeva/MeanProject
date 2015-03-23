var User = require('mongoose').model('User');

exports.renderHome = function(req, res, next){
	res.render('home',{
		user: req.user ? req.user.email : '',
	});
};

exports.renderLogin = function(req, res, next){
	res.render('login', {messages: req.flash('error')});
};

exports.renderRegister = function(req, res, next){
	res.render('register', {messages: req.flash('error')});
};

exports.register = function(req, res, next){
	if(!req.user){
		var user = new User(req.body);
		
		user.save(function(err){
			if(err){
				if(err.code){
					switch(err.code){
						case 11000:
						case 11001:
							req.flash('error','username already present');
							break;
						default:
							req.flash('error','some unknown error occured while registering you');
							break;
					}
				}
				return res.redirect('/register');
			}
			req.login(user, function(err){
				if(err){
					req.flash('unable to login you at this stage, please try login later');
					return next(err);
				}
				return res.redirect('/comments');
			});
		});
	}
	else{
		return res.redirect('/comments');
	}
};

exports.logout = function(req, res, next){
	req.logout();
	res.redirect('/');
};