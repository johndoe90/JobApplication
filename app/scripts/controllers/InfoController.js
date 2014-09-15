'use strict';

angular
	.module('jobApplication.controllers')
	.controller('InfoController', ['$scope', function($scope){
		var wasClicked = false;
		$scope.infos = [{
			title: 'Willkommen,',
			imageUrls: [],
			imageTexts: [],
			body: 'zu meinem etwas anderen Bewerbungsschreiben. Hier haben Sie die Möglichkeit einiges Wissenswerte über mich zu erfahren. Dazu müssen Sie nur auf einen der <a href="#" class="query">Links</a> klicken und Sie werden weitere Informationen zu diesem Thema erhalten. <br> Zum Schluss wäre ich Ihnen sehr dankbar, wenn Sie mir <a href="https://docs.google.com/forms/d/1Ec2c8jM2jtJiYphPuJZWGFWCFzdP2B0pL7iLg0fUGk4/viewform" class="query">Feedback</a> zu mir bzw. meiner Bewerbung geben würden.'
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