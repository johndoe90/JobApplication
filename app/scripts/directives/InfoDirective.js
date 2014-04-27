'use strict';

angular
	.module('jobApplication.directives')
	.directive('info', ['$timeout', function($timeout){
		return {
			restrict: 'AE',
			templateUrl: 'views/partials/info.tpl.html',
			link: function(scope, element) {
				scope.image = scope.info.imageUrls.length === 1 ? true : false;
				scope.carousel = scope.info.imageUrls.length > 1 ? true : false;
				scope.carouselId = 'carousel_' + Math.floor(Math.random() * 99999);

				$timeout(function(){
					if (scope.carousel) {
						element.find('#' + scope.carouselId).carousel({
							interval: 2500,
							wrap: false
						}, 100);
					}
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