'use strict';

angular
	.module('jobApplication.directives')
	.directive('feedback', [function(){
		return {
			restrict: 'A',
			replace: true,
			template: '<div style="position: relative;">&nbsp;<div class="query-box" style="position: absolute; right: 10px; top: 0;"><a class="query" href="https://docs.google.com/forms/d/1Ec2c8jM2jtJiYphPuJZWGFWCFzdP2B0pL7iLg0fUGk4/viewform">Feedback</a></div></div>"',
			link: function() {}
		};
	}]);