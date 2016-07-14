
app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts){

	function allPosts(){
		posts.getAll().then(function(response){
			$scope.posts = response.data;
		})
	}
	allPosts();

	$scope.addPost = function(){
	  if(!$scope.title || $scope.title === '') { return; }
	  posts.create({title: $scope.title,link: $scope.link});

	  $scope.title = '';
	  $scope.link = '';
	};

	$scope.incrementUpvotes = function(post) {
	  posts.upvote(post);
	};
  
}]);
