/* global d3 */

'use strict';

angular
	.module('jobApplication.directives')
	.directive('graph', ['$timeout', function($timeout){
		return {
			restrict: 'AE',
			link: function(scope, element, attr) {
				var width = element[0].clientWidth,
						height = element[0].clientHeight;

				var color = d3.scale.category20();

				var force = d3.layout.force()
					.charge(-2500)
					.gravity(0.125)
					.distance(70)
					.linkDistance(180)
					.size([width, height]);

				var svg = d3.select(element[0])
					.append('svg')
					.attr('width', width)
					.attr('height', height);

				force
					.nodes(scope.graph.nodes)
					.links(scope.graph.links)
					.start();

				var link = svg.selectAll('.link')
					.data(scope.graph.links)
					.enter()
					.append('line')
					.attr('class', 'link')
					.style('stroke-width', function(d) { return 1; });

				var circle = svg.selectAll('.circle21')
					.data(scope.graph.nodes)
					.enter()
					.append('circle')
					.attr('r', 53)
					.style('fill', function(d) { return color(JSON.stringify(d.labels)); });

				var node = svg.selectAll('.node')
					.data(scope.graph.nodes)
					.enter()
					.append('svg:image')
					.attr('xlink:href', function(d) { return 'http://10.0.0.38:9000/images/avatars/' + d.properties.avatar; })
					.attr('width', 96)
					.attr('height', 96)
					.attr('class', 'node')
					/*.on('click', function(d) { 
						scope.$apply(function() { 
							var test = {
								imageUrls: ['http://4.bp.blogspot.com/-N2qtEYea3s8/UUJl_MPnEEI/AAAAAAAAB8Q/qa0W4X82htk/s1600/Just-Rosie-rosie-huntington-whiteley-26560665-1920-1200.jpg', 
												 'http://1.bp.blogspot.com/-OxRZgLQLJoM/UorX7gsNzuI/AAAAAAAACZU/hoESRsqsg2w/s1600/Rosie%2BAlice%2BHuntington-Whiteley%2B(3).jpg', 
												 'http://2.bp.blogspot.com/-4sgyJ5d_gu0/UAKrKNpmq2I/AAAAAAAABug/TxuGgOcFKVE/s1600/Rosie%2BHuntington%2Bsexy%2Bgirl.jpg'],
								imageTexts: [],
								body:'<h4>Thumbnail label</h4> \
										  <p>Das ist der Text<br></p>' 
							};
							console.log(d.properties);
							scope.infos.unshift({imageUrls: d.properties.imageUrls, imageTexts: d.properties.imageTexts, body: d.properties.body}); 
						}
					)})*/
					.on('mousedown', function(d) {
						d.down = true;
						$timeout(function() {
							delete d.down;
						}, 250);
					})
					.on('mouseup', function(d) {
						if (d.down) {
							scope.$apply(function() {
								scope.infos.unshift({imageUrls: d.properties.imageUrls, imageTexts: d.properties.imageTexts, body: d.properties.body}); 
							});
						}
					})
					/*.on('click', function(d) {
						if (d.clicked) { 
							scope.$apply(function() {
								scope.infos.unshift({imageUrls: d.properties.imageUrls, imageTexts: d.properties.imageTexts, body: d.properties.body}); 
							});
						}

						d.clicked = true;
						$timeout(function() {
							d.clicked = false;
						}, 300);
					})*/
					.call(force.drag);

				node
					.append('title')
					.text(function(d) { return d.properties.title; });

				var linkText = svg.selectAll('.link-text')
					.data(scope.graph.links)
					.enter()
					.append('text')
					.attr('class', 'link-text')
					.text(function(d) { return d.type; });


				scope.$watch(function() {
					return element[0].clientWidth * element[0].clientHeight;
				}, function() {
					console.log('resize');
					width = element[0].clientWidth;
					height = element[0].clientHeight;
					
					svg.attr({width: width, height: height});
					force.size([width, height]);
					force.resume();
				});

				force.on('tick', function(){
					console.log('tick');
					link
						.attr('x1', function(d) { return d.source.x; })
				    .attr('y1', function(d) { return d.source.y; })
			      .attr('x2', function(d) { return d.target.x; })
			      .attr('y2', function(d) { return d.target.y; });

			    circle
			    	.attr('cx', function(d) { return d.x; })
			      .attr('cy', function(d) { return d.y; });

			    node
			    	.attr('x', function(d) { return (d.x - 48); })
      			.attr('y', function(d) { return (d.y - 48); });

			    linkText
			    	.attr('transform', function(d) {
			    		var dx = ( d.target.x - d.source.x ), dy = ( d.target.y - d.source.y );
							var dr = Math.sqrt(dx * dx + dy * dy);
							if (dr == 0) dr = 0.1;
							var sinus = dy / dr;
							var cosinus = dx / dr;
							var l = d.type.length * 8;
							var offset = ( 1 - ( l / dr ) ) / 2;
							var x = ( d.source.x + dx * offset );
							var y = ( d.source.y + dy * offset );
							return 'translate(' + x + ',' + y + ') matrix(' + cosinus + ', ' + sinus + ', ' + -sinus + ', ' + cosinus + ', 0 , 0)';
			    	});
				});
			}
		};
	}]);