'use strict';

angular
	.module('jobApplication.controllers')
	.controller('GraphController', ['$scope', '$stateParams', '$window', '$timeout', 'DataService', function($scope, $stateParams, $window, $timeout, DataService){
		$scope.query = $stateParams.q || 'MATCH (n1:Phillip) RETURN n1';

		DataService
			.query({ q: $scope.query })
			.then(function(graph){
				$timeout(function(){
					$scope.graph = graph;
				}, 150);
			});

		$window.addEventListener('resize', function(){
			$scope.$apply();
		}, false);
	}]);