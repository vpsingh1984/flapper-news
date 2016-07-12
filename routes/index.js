var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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

router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

//Single Post
router.get('/posts/:post', function(req, res) {
  req.post.populate('Comments', function(err, post){
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

//Upvotes for commients
router.put('/posts/:post/commients/comment/upvote', function(req, res, next) {
  req.post.upvote(function(err, post){
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
