'use strict';

var request = require('request');

var config = {
	url: 'http://localhost:5984/',
	db: 'quote'
}

var db = config.url + config.db;

function deleteDB() {
	console.log('==> deleteDB called.')
	console.log('Checking if ' + db + ' exists...')
	request.get(db, function(err, res, body) {

		if (res && res.statusCode == 404) {
			console.log('Does not exist. Nothing to delete.')
		} else {
			console.log('Exists.')
			console.log('Deleting ' + db + '...')

			request.delete(db, function(err, res, body) {
				if (err) {
					console.log('Unable to delete: ', err);
					return;
				}

				console.log('Deleted.');
				return 0;
			});
		}
	});
}

function createDB() {
	console.log('==> createDB called.')
	console.log('Checking if ' + db + ' already exists...')
	request.get(db, function(err, res, body) {

		if (res && res.statusCode == 200) {
			console.log('Exists. Nothing to create.')
			return 1;
		} else {
			console.log('Does not exist.')
			console.log('Creating ' + db + '...')

			request.put(db, function(err, res, body) {
				if (err) {
					console.log('Unable to create: ', err);
					return 1;
				}

				console.log('Created.');
				return 0;
			});
		}
	});
}

createDB();
//deleteDB();
