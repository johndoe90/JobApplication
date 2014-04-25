'use strict';

angular
	.module('jobApplication.controllers')
	.controller('GraphController', ['$scope', '$stateParams', '$window', 'DataService', '$timeout', function($scope, $stateParams, $window, DataService, $timeout){
		$scope.graph = undefined;
		$scope.query = $stateParams.q || 'MATCH (n:Phillip) RETURN n';

		DataService.query({
			q: $scope.query//'MATCH (p:Phillip)-[r*]->(h) RETURN p,r,h'//'START n=node(5) MATCH (n)<-[r]-(b) RETURN n,r,b'
		}).then(function(graph){
			$timeout(function(){
				$scope.graph = graph;
			}, 150);
		});

		$window.addEventListener('resize', function(){
			$scope.$apply();
		}, false);
	}]);