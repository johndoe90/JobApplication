'use strict';

var testdata = JSON.parse('{"results":[{"columns":["n","r","b"],"data":[{"graph":{"nodes":[{"id":"17","labels":["Question"],"properties":{"body":"Thisisthequestionbody"}},{"id":"5","labels":["Category"],"properties":{"name":"Food"}}],"relationships":[{"id":"19","type":"BELONGS_TO","startNode":"17","endNode":"5","properties":{}}]}},{"graph":{"nodes":[{"id":"16","labels":["Question"],"properties":{"body":"Thisisthequestionbody"}},{"id":"5","labels":["Category"],"properties":{"name":"Food"}}],"relationships":[{"id":"16","type":"BELONGS_TO","startNode":"16","endNode":"5","properties":{}}]}},{"graph":{"nodes":[{"id":"5","labels":["Category"],"properties":{"name":"Food"}},{"id":"15","labels":["Question"],"properties":{"body":"Thisisthequestionbody"}}],"relationships":[{"id":"13","type":"BELONGS_TO","startNode":"15","endNode":"5","properties":{}}]}},{"graph":{"nodes":[{"id":"5","labels":["Category"],"properties":{"name":"Food"}},{"id":"14","labels":["Question"],"properties":{"body":"Thisisthequestionbody"}}],"relationships":[{"id":"11","type":"BELONGS_TO","startNode":"14","endNode":"5","properties":{}}]}}]}],"errors":[]}');

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

Graph.prototype.hasNode = function(node) {
	return this.nodes.some(function(currentNode){
		return (node.id === currentNode.id);
	});
};

Graph.prototype.addNode = function(node) {
	if (!this.hasNode(node)){
		this.nodes.push(node);
	}
};

Graph.prototype.addLink = function(relationship){
	this.links.push({
		id: relationship.id,
		type: relationship.type,
		properties: relationship.properties,
		source: this.indexOfNode(relationship.startNode),
		target: this.indexOfNode(relationship.endNode)
	});
};

function convert(data) {
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

console.log(JSON.stringify(convert(testdata)));



























