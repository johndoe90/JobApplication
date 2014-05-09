'use strict';

var neo4j = require('./../config/neo4j'),
		db = neo4j.db;

exports.query = function(req, res) {
	if (!req.query.q) { res.send(400, 'No query specified!'); }

	var statements = {
		statements: [
			{
				statement: req.query.q,
				resultDataContents: ['graph']
			}
		]
	}; 

	db.beginAndCommitTransactionAsync(statements).then(function(results){
		res.json(results);
	});
};

/*exports.whatever = function(req, res) {
	var statements = {
		statements: [
			{
				statement: 'START n=node(5) MATCH (n)<-[r]-(b) RETURN n,r,b',
				resultDataContents: ['graph']
			}
		]
	};

	db.beginAndCommitTransactionAsync(statements).then(function(results){
		res.json(results);
	});
};*/
