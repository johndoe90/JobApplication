'use strict';

angular
	.module('jobApplication.controllers')
	.controller('InfoController', ['$scope', function($scope){
		$scope.infos = [{
			title: 'Willkommen,',
			imageUrls: [],
			imageTexts: [],
			body: 'zu meinem etwas anderen Bewerbungsschreiben. Hier haben Sie die Möglichkeit einiges Wissenswerte über mich zu erfahren. Dazu müssen Sie nur auf einen der <a href="#" class="query">#Links</a> (links oben) klicken und Sie werden weitere Informationen zu diesem Punkt erhalten. <br> Um die Wörter, welche die einzelenen Elemente miteinander verbinden, besser lesen zu können, ist jedes Element beliebig verschiebbar (linke Maustaste gedrückt halten). Außerdem kann man jedes Element anklicken um zusätzliche Infos darüber zu erfahren. <br> Viel Spaß beim stöbern!'
		}];

		/*$scope.remove = function(index) {
			$scope.infos.splice(index, 1);
		};*/

		console.log(navigator.sayswho);
	}]);