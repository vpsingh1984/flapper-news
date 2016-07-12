var app = angular.module('flapperNews', ['ui.router']);
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
		  url: '/home',
		  templateUrl: '/home.html',
		  controller: 'MainCtrl',
		  resolve:{
		  	postPromise: ['posts', function(posts){
		  		return posts.getAll();
		  	}]
		  }
		})
		.state('posts', {
		  url: '/posts/{id}',
		  templateUrl: '/posts.html',
		  controller: 'PostsCtrl',
		  resolve: {
		    post: ['$stateParams', 'posts', function($stateParams, posts) {
		      return posts.get($stateParams.id);
		    }]
		  }
		});

		$urlRouterProvider.otherwise('home');
}]);

app.factory('posts', ['$http', function($http){
  	var o = {
	    posts: []
	  };
	//Get all posts
	o.getAll = function(){
		return $http.get('/posts').success(function(data){
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

app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts){

	function allPosts(){
		posts.getAll().then(function(response){
			$scope.posts = response.data;
		})
	}
	allPosts();

	// $scope.addPost = function(){
	// 	if (!$scope.title || $scope.title === '') {
	// 		return;
	// 	};
	//   	$scope.posts.push({
	//   		title: $scope.title, 
	//   		link: $scope.link,
	//   		upvotes: 0,
	// 		comments: [
	// 		    {author: 'Joe', body: 'Cool post!', upvotes: 0},
	// 		    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
	// 		]
	//   	});
	//   	$scope.title = '';
	//   	$scope.link = '';
	// };
	$scope.addPost = function(){
	  if(!$scope.title || $scope.title === '') { return; }
	  posts.create({
	    title: $scope.title,
	    link: $scope.link,
	  });
	  $scope.title = '';
	  $scope.link = '';
	};

	$scope.incrementUpvotes = function(post) {
	  posts.upvote(post);
	};
  
}]);

//Posts Controller for Comments
app.controller('PostsCtrl', ['$scope','posts', 'post', function($scope, posts, post){

	$scope.post = post;
	console.log($scope.post);

	// $scope.post = posts.posts[$stateParams.id];
	// $scope.addComment = function(){
	//   if($scope.body === '') { return; }
	//   $scope.post.comments.push({
	//     body: $scope.body,
	//     author: 'user',
	//     upvotes: 0
	//   });
	//   $scope.body = '';
	// };
	$scope.addComment = function(){
	  if($scope.body === '') { return; }
	  posts.addComment(post._id, {
	    body: $scope.body,
	    author: 'user',
	  }).success(function(comment) {
	    $scope.post.comments.push(comment);
	  });
	  $scope.body = '';
	};

}]);