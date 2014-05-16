'use strict';

var neo4j = require('./../config/neo4j'),
		db = neo4j.db,
		restricted = ['create', 'merge', 'set', 'delete', 'remove', 'index', 'constraint'];

exports.query = function(req, res) {
	if (!req.query.q) { res.send(400, 'No query specified!'); }
	if ( restricted.some(function(word) { return req.query.q.toLowerCase().indexOf(word) + 1; })) { res.send(400, 'You naughty boy!'); }

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

