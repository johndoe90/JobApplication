'use strict';

var Promise = require('bluebird');
var neo4j = require('node-neo4j');
var db = Promise.promisifyAll(new neo4j(process.env['GRAPHENEDB_URL'] || 'http://localhost:7474'));

exports.db = db;
