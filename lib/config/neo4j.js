'use strict';

var Promise = require('bluebird');
var neo4j = require('node-neo4j');
var db = Promise.promisifyAll(new neo4j('http://localhost:7474'));

exports.db = db;
