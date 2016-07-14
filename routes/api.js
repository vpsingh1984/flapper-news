var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');


//Getting all posts
router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts){
  	if (err) {
  		return next(err);
  	}
  	//console.log(posts.title);
  	res.json(posts);
  });
});

//Add post
router.post('/posts', function(req, res, next) {
	var post = new Post(req.body);
	console.log(req.body.title);
	post.save(function(err, post){
		if (err) {
			console.log(err);
			return next(err);
		}
		//console.log(post);
		res.json(post);
	});
});

// router.param('/posts/:id', function(req, res, next, id) {
//   var query = Post.findById(id);

//   query.exec(function (err, post){
//     if (err) { return next(err); }
//     if (!post) { return next(new Error('can\'t find post')); }

//     req.post = post;
//     return next();
//   });
// });

//Single Post
// router.get('/posts/:id', function(req, res) {
// 	console.log(req.params.post);
//   req.Post.populate('Comments', function(err, post){
//   	if (err) { return next(err); }

//   	res.json(req.post);
//   });
// });

router.get('/posts/:id', function(req, res) {
    console.log(req.body.id);
    Post.findById(req.body.id, function(error, post) {
	  	if (err) { return next(err); }

	  	res.json(req.post);
	  });
});


//upvotes
router.put('/posts/:post/upvote', function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

//Comments 
router.post('/posts/:post/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;
  console.log(req.body);

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    //console.log(req.post.comments);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

//Upvotes for comments
router.put('/posts/:post/commients/comment/upvote', function(req, res, next) {
  req.post.upvote(function(err, post){
    console.log(err);
    console.log(post);
    if (err) { return next(err); }

    res.json(post);
  });
});

//Retrieve coments from post
router.param('post/:post/comments/:comment', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

module.exports = router;
