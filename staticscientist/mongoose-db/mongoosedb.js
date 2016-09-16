module.exports = {
	loadDBConnection : function() {

		var mongoose = require('mongoose');
		var mongoosastic = require('mongoosastic');
		var Schema = mongoose.Schema;

		mongoose.connect('mongodb://localhost/babadb');
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'database connection error mongoose :'));
		db.once('open', function(callback) {
			console.log("Mongoose ORM connected");
		});
	}
};
