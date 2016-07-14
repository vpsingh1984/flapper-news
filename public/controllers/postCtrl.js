
app.controller('PostCtrl', ['$scope','$stateParams', 'postService', function($scope, $stateParams, postService){

	var post = postService.get($stateParams.id, function(response) {
	    console.log(response);
	}); // get() returns a single entry

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
	  postService.addComment(post._id, {
	    body: $scope.body,
	    author: 'user',
	  }).success(function(comment) {
	    $scope.post.comments.push(comment);
	  });
	  $scope.body = '';
	};

}]);