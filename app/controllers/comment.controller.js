var Comment = require('mongoose').model('Comment');

exports.renderPage = function(req, res, next){
	Comment.find({}, function(err, comments){
		if(err){
			res.render('comments',{allcomments: []});
			next(err);
		}
		else{
			res.render('comments',{allcomments: comments});
		}
	});
};

exports.create = function(req, res, next){
	var newcomment = new Comment({
		'email': req.user.email,
		'comment': req.body.comment
	});
	newcomment.save(function(err){
		if(err){
			next(err);
		}
		Comment.find({}, function(err, comments){
		if(err){
			res.render('comments',{allcomments: []});
			next(err);
		}
		else{
			res.render('comments',{allcomments: comments});
		}
	});
	});
};