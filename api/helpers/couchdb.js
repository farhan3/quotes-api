'use strict';

var path = require('path');
var mn = path.basename(__filename, path.extname(__filename));

// logging
var Debug = require('debug')
var debug = Debug(mn);
var error = console.error

// promise
var bluebird = require('bluebird');

// config
var config = require('./../../config.json').couchdb

// pkgs
var nano = require('nano')(config.url);
var db = bluebird.promisifyAll(nano.db);

exports.setup = function(clean = false, cb) {
	var debug = Debug(mn + ':setup');
	debug('setting up db.');

	db.getAsync(config.db).then(function() {
		debug('db exists.');
		if (clean) {
			db.destroyAsync(config.db).then(function() {
				db.createAsync(config.db).then(function() {
					debug('new db created.');
					db.getAsync(config.db).then(function(result) {
						cb(null, result);
					});
				}).catch(function(err) {
					error('error creating db: ', err);
					cb(err, null);
				});
			}).catch(function(err) {
				error('error deleting db: ', err);
				cb(err, null);
			});
		}
	}).catch(function(err) {
		db.createAsync(config.db).then(function(result) {
			debug('new db created.');
			db.getAsync(config.db).then(function(result) {
				cb(null, result);
			});
		}).catch(function(err) {
			error('error creating db: ', err);
			cb(err, null);
		});
	});
}
