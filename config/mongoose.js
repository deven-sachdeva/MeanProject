var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);
	require('../app/models/comment.model');
	require('../app/models/user.model');
	return db;
};