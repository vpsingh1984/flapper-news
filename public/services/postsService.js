// app.factory('articleService', function($resource, $http){
	
// 	return $resource('/api/articles/:articleId', {articleId: '@id'},
// 		{update: {method: 'PUT'}}
// 	);

// //this code is commented for $resouse service
// 	// var factory = {};
// 	// factory.getArticles = function(){
// 	// 	return $http.get('/api/articles');
// 	// }
// 	// return factory;
// });

app.factory('posts', ['$http', function($http){
  	var o = {
	    posts: []
	  };
	//Get all posts
	o.getAll = function(){
		return $http.get('api/posts').success(function(data){
			console.log(data);
			angular.copy(data, o.posts);
		});
	}
//create a post
	o.create = function(post) {
	  return $http.post('/posts', post).success(function(data){
	    o.posts.push(data);
	  });
	};
//add upvote to post not to comment
	o.upvote = function(post) {
	  return $http.put('/posts/' + post._id + '/upvote')
	    .success(function(data){
	      post.upvotes += 1;
	    });
	};
	
//fetch single post
	o.get = function(id) {
	  return $http.get('/posts/' + id).then(function(res){
	    return res.data;
	  });
	};

//adding a comment to the post
	o.addComment = function(id, comment) {
	  return $http.post('/posts/' + id + '/comments', comment);
	};
	

	return o;

}]);