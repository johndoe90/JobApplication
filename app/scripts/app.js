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
			.state('parent', {
				abstract: true,
				url: '/parent',
				controller: 'AppController',
				templateUrl: 'views/partials/parent.html'
			})
			.state('parent.child', {
				url: '/child/:q',
				controller: 'GraphController',
				templateUrl: 'views/partials/child.html'
			});

		$urlRouterProvider.otherwise('/parent/child/');
	}]);
