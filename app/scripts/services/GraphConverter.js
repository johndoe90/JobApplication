'use strict';

angular
	.module('jobApplication.services')
	.factory('GraphConverter', [function(){
		function Graph() {
			this.nodes = [];
			this.links = [];
		}

		Graph.prototype.indexOfNode = function(nodeId) {
			for(var i = 0; i < this.nodes.length; i++) {
				if (nodeId === this.nodes[i].id) { return i; }
			}

			return -1;
		};

		Graph.prototype.indexOfLink = function(linkId) {
			for(var i = 0; i < this.links.length; i++) {
				if (linkId === this.links[i].id) { return i; }
			}

			return -1;
		};

		Graph.prototype.hasLink = function(link) {
			return this.links.some(function(currentLink) {
				return (link.id === currentLink.id);
			});
		};

		Graph.prototype.hasNode = function(node) {
			return this.nodes.some(function(currentNode) {
				return (node.id === currentNode.id);
			});
		};

		Graph.prototype.addNode = function(node) {
			if (!this.hasNode(node)){
				this.nodes.push(node);
			}
		};

		Graph.prototype.addLink = function(relationship){
			if (!this.hasLink(relationship)) {
				this.links.push({
					id: relationship.id,
					type: relationship.type,
					properties: relationship.properties,
					source: this.indexOfNode(relationship.startNode),
					target: this.indexOfNode(relationship.endNode)
				});
			}
		};

		return {
			convert: function(data){
				var graph = new Graph();

				data.results.forEach(function(currentResult){
					currentResult.data.forEach(function(currentData){
						currentData.graph.nodes.forEach(function(currentNode){
							graph.addNode(currentNode);
						});

						currentData.graph.relationships.forEach(function(currentRelationship){
							graph.addLink(currentRelationship);
						});
					});
				});

				return {
					nodes: graph.nodes,
					links: graph.links
				};
			}
		};
	}]);