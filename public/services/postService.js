app.factory('postService', ['$http', function($http){
  	var o = {
	    posts: []
	  };
	
//fetch single post
	o.get = function(id) {
	  return $http.get('api/posts/' + id).then(function(res){
	  	console.log(res.data);
	    return res.data;
	  });
	};

//adding a comment to the post
	o.addComment = function(id, comment) {
	  return $http.post('api/posts/' + id + '/comments', comment);
	};
	

	return o;

}]);