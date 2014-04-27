'use strict';

angular
	.module('jobApplication.services', [])
	.constant('DataServiceConfig', {
		url: 'http://10.0.0.38:9000/api/query'
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
				templateUrl: 'views/partials/info.html'
			})
			.state('info.graph', {
				url: '/graph/:q',
				controller: 'GraphController',
				templateUrl: 'views/partials/graph.html'
			});

		$urlRouterProvider.otherwise('/info/graph/');
	}]);
