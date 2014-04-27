'use strict';

angular
	.module('jobApplication.controllers')
	.controller('InfoController', ['$scope', function($scope){
		$scope.infos = [{
			imageUrls: [],
			imageTexts: [],
			body: '<h4>Check it out!</h4><p>This is my Application</p>'
		}];

		$scope.remove = function(index) {
			$scope.infos.splice(index, 1);
		};
	}]);