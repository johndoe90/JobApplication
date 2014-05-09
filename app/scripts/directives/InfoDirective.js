'use strict';

angular
	.module('jobApplication.directives')
	.directive('info', ['$timeout', function($timeout){
		return {
			restrict: 'AE',
			replace: true,
			templateUrl: 'partials/wtf.html',
			link: function(scope, element) {
				scope.image = scope.info.imageUrls.length === 1 ? true : false;
				scope.carousel = scope.info.imageUrls.length > 1 ? true : false;
				scope.carouselId = 'carousel_' + Math.floor(Math.random() * 99999);

				$timeout(function(){
					if (scope.carousel) {
						element.find('#' + scope.carouselId).carousel({
							interval: 4000,
							wrap: false
						}, 100);
					}
				});

				var remove = element.find('.remove');
				element.on('mouseenter', function(){
					remove.fadeIn(200);
				}).on('mouseleave', function() {
					remove.fadeOut(200);
				});

				remove.on('click', function() {
					element.animate({
						'height': '0'
					}, 400, function(){
						scope.$apply(function() {
							scope.infos.splice(+element.attr('index'), 1);
						});
					});
				});
			}
		};
	}]);