'use strict';

angular
	.module('jobApplication.controllers')
	.controller('InfoController', ['$scope', function($scope){
		$scope.infos = [{
			title: 'Willkommen',
			imageUrls: [],
			imageTexts: [],
			body: 'zu meinem etwas anderen Bewerbungsschreiben.'
		}];

		/*$scope.remove = function(index) {
			$scope.infos.splice(index, 1);
		};*/
	}]);