var app = angular.module('flapperNews', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
		  url: '/',
		  templateUrl: 'views/home.html',
		  controller: 'MainCtrl'
		  // resolve:{
		  // 	postPromise: ['posts', function(posts){
		  // 		return posts.getAll();
		  // 	}]
		  // }
		})
		.state('posts', {
		  url: '/posts/{id}',
		  templateUrl: 'views/posts.html',
		  controller: 'PostCtrl'
		  // resolve: {
		  //   post: ['$stateParams', 'posts', function($stateParams, posts) {
		  //     return posts.get($stateParams.id);
		  //   }]
		  // }
		});

		$urlRouterProvider.otherwise('/');

}]);