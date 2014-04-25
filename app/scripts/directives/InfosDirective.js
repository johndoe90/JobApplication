'use strict';

angular
	.module('jobApplication.directives')
	.directive('infos', [function(){
		return {
			restrict: 'AE',
			template: '<div info ng-repeat="info in data.infos"></div>',
			link: function(scope, element, attr) {
				
			}
		};
	}]);