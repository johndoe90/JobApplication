'use strict';

angular
	.module('jobApplication.controllers')
	.controller('GraphController', ['$scope', '$rootScope',  '$stateParams', '$window', '$timeout', 'DataService', function($scope, $rootScope, $stateParams, $window, $timeout, DataService){
		$scope.query = $stateParams.q || 'MATCH (n1:Phillip) RETURN n1';

		$rootScope.$broadcast('start-loading');
		DataService
			.query({ q: $scope.query })
			.then(function(graph){
				$timeout(function(){
					$scope.graph = graph;
					$rootScope.$broadcast('stop-loading');
				}, 150);
			});

		$window.addEventListener('resize', function(){
			$scope.$apply();
		}, false);
	}]);