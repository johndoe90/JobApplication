'use strict';

angular
	.module('jobApplication.directives')
	.directive('fullscreen', [function(){
		return {
			link: function($scope, $element, $attr) {
				var el = $element.get(0);
				$element.one('click', function() {
					if (el.requestFullscreen) {
						console.log('default fullscreen');
						el.requestFullscreen();
					} else if (el.webkitRequestFullscreen) {
						console.log('webkit fullscreen');
						el.webkitRequestFullscreen();
					} else if (el.mozRequestFullScreen) {
						console.log('mozilla fullscreen');
						el.mozRequestFullScreen();
					} else if (el.msRequestFullscreen) {
						console.log('microsoft fullscreen');
						el.msRequestFullscreen();
					} else {
						console.log('not supported');
					}
				});
			}
		};
	}])