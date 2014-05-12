'use strict';

angular
	.module('jobApplication.directives')
	.directive('browser', [function(){
		navigator.sayswho= (function(){
			var ua= navigator.userAgent, tem, 
			M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
			if(/trident/i.test(M[1])){
				tem=  /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
				return 'IE '+(tem[1] || '');
			}
			M= M[2]? [M[1], M[2]]:[navigator.appName, navigator.appVersion, '-?'];
			if((tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
			return M.join(' ');
		})();

		return {
			restrict: 'A',
			replace: true,
			template: '<div><div id="wrong-browser" style="display: none; position: absolute; top: 0; left: 0; z-index: 9999; width: 100%; height: 100%; background-color: hsla(0 , 100%, 0%, 0.7);"><div style="position: relative; top: 200px; width: 400px; margin-left: auto; margin-right: auto; color: white; font-family: Menlo,Monaco,Consolas,monospace; font-size: 115%;">Diese Anwendung wurde mit folgenden Browsern getestet: <br> <ul><li>Chrome 34</li><li>Firefox 29</li><li>Internet Explorer 9, 10, 11</li></ul>  Sollten Sie einen anderen Browser verwenden, kann es sein, dass die Seite nicht richtig angezeigt wird.</div></div></div>',
			link: function(scope, element) {
				var browser = navigator.sayswho.toLowerCase();

				if( browser.indexOf('chrome') === 0 ){

				} else if ( browser.indexOf('firefox') === 0) {

				} else if ( browser.indexOf('ie') === 0 || browser.indexOf('msie') === 0) {
					if ( parseInt(browser.split(' ')[1]) < 9) { element.find('#wrong-browser').show(); }
				} else {
					element.find('#wrong-browser').show();
				}

				element.on('click', function(){
					element.find('#wrong-browser').fadeOut();
				});

				console.log(browser);
			}
		};
	}]);