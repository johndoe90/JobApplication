'use strict';

angular
	.module('jobApplication.services', [])
	.constant('DataServiceConfig', {
		url: 'http://mysterious-sands-4193.herokuapp.com/api/query'
	});

angular
	.module('jobApplication.directives', []);

angular
	.module('jobApplication.controllers', []);

angular
	.module('jobApplication', ['ui.router', 'ngAnimate', 'ngSanitize', 'jobApplication.controllers', 'jobApplication.services', 'jobApplication.directives'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('info', {
				abstract: true,
				url: '/info',
				controller: 'InfoController',
				templateUrl: 'partials/info.html'
			})
			.state('info.graph', {
				url: '/graph/:q',
				controller: 'GraphController',
				templateUrl: 'partials/graph.html'
			});

		$urlRouterProvider.otherwise('/info/graph/');
	}]);
