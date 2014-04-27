'use strict';

angular
	.module('jobApplication.directives')
	.directive('fullscreen', [function(){
		return {
			link: function($scope, $element) {
				var el = $element.get(0);
				$element.one('click', function() {
					if (el.requestFullscreen) {
						el.requestFullscreen();
					} else if (el.webkitRequestFullscreen) {
						el.webkitRequestFullscreen();
					} else if (el.mozRequestFullScreen) {
						el.mozRequestFullScreen();
					} else if (el.msRequestFullscreen) {
						el.msRequestFullscreen();
					} else {
						console.log('fullscreen not supported');
					}
				});
			}
		};
	}]);