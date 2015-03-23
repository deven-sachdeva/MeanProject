var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
	email: String,
	comment: String,
});

mongoose.model('Comment', commentSchema);