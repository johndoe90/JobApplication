'use strict';

angular
	.module('jobApplication.controllers')
	.controller('InfoController', ['$scope', function($scope){
		var wasClicked = false;
		$scope.infos = [{
			title: 'Sehr geehrte Damen und Herren,',
			imageUrls: [],
			imageTexts: [],
			body: 'herzlich willkommen zu meinem etwas anderen Bewerbungsschreiben. Hier haben Sie die Möglichkeit einiges Wissenswerte über mich zu erfahren. Dazu müssen Sie nur auf einen der <a href="#" class="query">Links</a> klicken und Sie werden weitere Informationen zu diesem Thema erhalten.'
		}];

		$scope.clicked = function() {
			if ( !wasClicked ) {
				wasClicked = true;
				$scope.infos.unshift({
					title: '',
					imageUrls: [],
					imageTexts: [],
					body: 'Alle meine Daten sind in einem Graphen gespeichert, wobei jedes Bild einen Knoten symbolisiert. Die Art der Beziehung zwischen zwei Knoten ist mit einem Wort beschrieben. Zur besseren Leserlichkeit, kann jedes Element beliebig verschoben werden (linke Maustaste gedrückt halten). Außerdem haben Sie die Möglichkeit jeden Knoten anzuklicken um zusätzliche Informationen darüber zu erhalten.'
				});
			}
		};
	}]);
