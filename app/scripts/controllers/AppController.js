'use strict';

angular
	.module('jobApplication.controllers')
	.controller('AppController', ['$scope', '$sce', function($scope, $sce){
		$scope.infos = [{
			imageUrls: [],
			imageTexts: [],
			body: '<h4>Check it out!</h4><p>This is my Application</p>'
		}];

		$scope.renderHtml = function(html) {
			return $sce.trustAsHtml(html);
		};

		$scope.remove = function(index) {
			$scope.infos.splice(index, 1);
		};

		$scope.numbers = [1,2,3,4,5,6,7,8,9,10];
		$scope.removeNumber = function(index) {
			$scope.numbers.splice(index, 1);
		};
	}]);