var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy,
   User = require('mongoose').model('User');

module.exports = function()
{
	passport.use(new LocalStrategy({usernameField: 'email'}, function(username, password, done) 
	{
		User.findOne({ email: username }, function (err, user) 
		{
			if (err) { 
				return done(err, false, {message: 'Some problem with database, can you please try again later, Thanks.'}); 
			}
			if (!user) {
				return done(null, false, {message: 'this email is not known to us, please click on Home and register yourself'});
			}
			if (!user.authenticate(password)) {
				return done(null, false, {message: 'It seems you have forgotten the password, please scratch your brain!'});
			}
			return done(null, user);
			
		});
	})
)};