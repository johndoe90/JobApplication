/* global d3 */

'use strict';

angular
	.module('jobApplication.directives')
	.directive('graph', ['$timeout', function($timeout){
		return {
			link: function(scope, element) {
				var r = 48;

				var width = element[0].clientWidth,
						height = element[0].clientHeight;

				var color = d3.scale.category20();

				var force = d3.layout.force()
					.charge(-2500)
					.gravity(0.125)
					.distance(70)
					.linkDistance(180)
					.size([width, height]);

				force
					.nodes(scope.graph.nodes)
					.links(scope.graph.links)
					.start();

				force.on('tick', function(){
					link
						.attr('x1', function(d) { return d.source.x; })
				    .attr('y1', function(d) { return d.source.y; })
			      .attr('x2', function(d) { return d.target.x; })
			      .attr('y2', function(d) { return d.target.y; });

			    circle
						.attr('cx', function(d) { return d.x; })
			      .attr('cy', function(d) { return d.y; });

			    node
						.attr('x', function(d) { return (d.x - r); })
						.attr('y', function(d) { return (d.y - r); });

			    linkText
						.attr('transform', function(d) {
							var dx = ( d.target.x - d.source.x ), dy = ( d.target.y - d.source.y ),
									dr = Math.sqrt(dx * dx + dy * dy) || 0.1,
									sinus = dy / dr,
									cosinus = dx / dr,
									l = d.type.length * 8,
									offset = ( 1 - ( l / dr ) ) / 2,
									x = ( d.source.x + dx * offset ),
									y = ( d.source.y + dy * offset );

							return 'translate(' + x + ',' + y + ') matrix(' + cosinus + ', ' + sinus + ', ' + -sinus + ', ' + cosinus + ', 0 , 0)';
						});
				});

				var svg = d3.select(element[0])
					.append('svg')
					.attr('width', width)
					.attr('height', height);

				var link = svg.selectAll('.link')
					.data(scope.graph.links)
					.enter()
					.append('line')
					.attr('class', 'link')
					.style('stroke-width', 1);

				var circle = svg.selectAll('.circle21')
					.data(scope.graph.nodes)
					.enter()
					.append('circle')
					.attr('r', Math.ceil(1.1 * r))
					.style('fill', function(d) { return color(JSON.stringify(d.labels)); });

				var node = svg.selectAll('.node')
					.data(scope.graph.nodes)
					.enter()
					.append('svg:image')
					.attr('xlink:href', function(d) { return d.properties.avatar; })
					.attr('width', r * 2)
					.attr('height', r * 2)
					.attr('class', 'node')
					.on('mousedown', function(d) {
						d.down = true;
						$timeout(function() {
							delete d.down;
						}, 250);
					})
					.on('mouseup', function(d) {
						if (d.down) {
							scope.$apply(function() {
								scope.infos.unshift({imageUrls: d.properties.imageUrls, imageTexts: d.properties.imageTexts, body: d.properties.body, title: d.properties.title});
							});
						}
					})
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
					width = element[0].clientWidth;
					height = element[0].clientHeight;
					
					svg.attr({width: width, height: height});
					force.size([width, height]);
					force.resume();
				});
			}
		};
	}]);