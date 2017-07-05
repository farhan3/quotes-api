// promise
var bluebird = require('bluebird');

var assert = require('chai').assert;
assert = bluebird.promisifyAll(assert);

var couchdb = require('./../../../api/helpers/couchdb.js');
couchdb = bluebird.promisifyAll(couchdb);

var request = require('request');
request = bluebird.promisifyAll(request);

var config = require('./../../../config.json').couchdb;
var nano = require('nano')(config.url);
var db = bluebird.promisifyAll(nano.db);

describe('helpers', function() {
describe('couchdb', function() {
describe('setup', function() {

	beforeEach(function() {
		return db.destroyAsync(config.db);
	});

	it('should create a new db', function(done) {
		couchdb.setup(false, function(err, result) {
			request.get(config.url + '/' + config.db, function(err, res, body) {
				assert.equal(res.statusCode, 200, 'db was not created.');
				done();
			});
		});
	});
});
});
});
