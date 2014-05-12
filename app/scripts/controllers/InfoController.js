'use strict';

angular
	.module('jobApplication.controllers')
	.controller('InfoController', ['$scope', function($scope){
		var wasClicked = false;
		$scope.infos = [{
			title: 'Willkommen,',
			imageUrls: [],
			imageTexts: [],
			body: 'zu meinem etwas anderen Bewerbungsschreiben. Hier haben Sie die Möglichkeit einiges Wissenswerte über mich zu erfahren. Dazu müssen Sie nur auf einen der <a href="#" class="query">Links</a> klicken und Sie werden weitere Informationen zu diesem Thema erhalten.'
		}];

		$scope.clicked = function() {
			if ( !wasClicked ) {
				wasClicked = true;
				$scope.infos.unshift({
					title: '',
					imageUrls: [],
					imageTexts: [],
					body: 'Jedes der runden Elemente ist mit einem oder mehreren Elementen durch eine Linie verbunden. Die Beziehung zwischen zwei Elementen wird durch ein Wort beschrieben. Zur besseren Leserlichkeit, kann jedes Element beliebig verschoben werden (linke Maustaste gedrückt halten). Außerdem ist es möglich jedes Element anzuklicken um zusätzliche Informationen darüber zu erhalten.'
				});
			}
		};
	}]);