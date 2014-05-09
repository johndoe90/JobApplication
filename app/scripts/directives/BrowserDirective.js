'use strict';

angular
	.module('jobApplication.directives')
	.directive('browser', [function(){
		return {
			restrict: 'A',
			replace: true,
			template: '<div><div id="wrong-browser" style="display: none; position: absolute; top: 0; left: 0; z-index: 9999; width: 100%; height: 100%; background-color: hsla(0 , 100%, 0%, 0.7);"><div style="position: relative; top: 200px; width: 400px; margin-left: auto; margin-right: auto; color: white; font-family: Menlo,Monaco,Consolas,monospace; font-size: 115%;">Diese Anwendung wurde mit folgenden Browsern getestet: <br> <ul><li>Chrome 34</li><li>Firefox 29</li><li>Internet Explorer 10, 11</li><li>Safari 7</li></ul>  Sollten Sie einen anderen Browser verwenden, kann es sein, dass die Seite nicht richtig angezeigt wird.</div></div></div>',
			link: function(scope, element) {
				var browser = navigator.sayswho.toLowerCase();

				if( browser.indexOf('chrome') === -1 && browser.indexOf('firefox') === -1 && browser.indexOf('ie') === -1) {
					element.find('#wrong-browser').show();
				}

				console.log(browser);

				element.on('click', function(){
					element.find('#wrong-browser').fadeOut();
				});
			}
		};
	}]);