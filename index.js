var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/pokemon';

MongoClient.connect(url, function(err, db) {
	console.log("connected");
	db.close();
});