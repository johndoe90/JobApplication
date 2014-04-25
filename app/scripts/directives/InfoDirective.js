'use strict';

angular
	.module('jobApplication.directives')
	.directive('info', ['$timeout', function($timeout){
		return {
			restrict: 'AE',
			//replace: true,
			templateUrl: 'views/partials/info.html',
			link: function(scope, element, attr) {
				scope.image = scope.info.imageUrls.length === 1 ? true : false;
				scope.carousel = scope.info.imageUrls.length > 1 ? true : false;
				scope.carouselId = 'carousel_' + Math.floor(Math.random() * 99999); 

				$timeout(function(){
					element.find('#' + scope.carouselId).carousel({
						interval: 2500,
						wrap: false
					}, 100);
				});

				var remove = element.find('.remove');
				element.on('mouseenter', function(){
					remove.fadeIn();
				}).on('mouseleave', function() {
					remove.fadeOut();
				});
			}
		};
	}]);