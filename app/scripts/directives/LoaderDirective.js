'use strict';

angular
	.module('jobApplication.directives')
	.directive('loader', [function() {
		return {
			restrict: 'AE',
			template: '<img src="images/loader.gif" style="display: none; position: absolute; top: 50%; top: calc(50% - 33px); left: 50%; left: calc(50% - 33px); z-index: 250;">',
			link: function($scope, $element) {
				$scope.$on('start-loading', function() {
					$element.children('img:first').show();
				});

				$scope.$on('stop-loading', function() {
					$element.children('img:first').fadeOut(300);
				});
			}
		};
	}]);