module.exports = {

	loadDBConnAndModels : function() {

		var mongoose = require('mongoose');
		var mongoosastic = require('mongoosastic');
		var Schema = mongoose.Schema;

		DBConn = require('./mongoosedb.js');

		DBConn.loadDBConnection();

		console.log(" loading... UserModel");
		var userModel = require('./DaoModel/UserModel.js');
		userModel.createSchemaAndGetModel(mongoose, mongoosastic, Schema);
		console.log(" UserModel loaded successfully.");

		console.log(" loading... TagModel");
		var tagModel = require('./DaoModel/TagModel.js');
		tagModel.createSchemaAndGetModel(mongoose, mongoosastic, Schema);
		console.log(" TagModel loaded successfully.");

		var notificationModel = require('./DaoModel/NotificationModel.js');
		notificationModel.createSchemaAndGetModel(mongoose, mongoosastic, Schema);
		console.log(" NotificationModel loaded successfully.");

		var userNotificationModel = require('./DaoModel/UserNotificationModel.js');
		userNotificationModel.createSchemaAndGetModel(mongoose, mongoosastic, Schema);
		console.log(" UserNotificationModel loaded successfully.");

		var tagPageDtlModel = require('./DaoModel/TagPageDtlModel.js');
		tagPageDtlModel.createSchemaAndGetModel(mongoose, mongoosastic, Schema);
		console.log(" TagPageDtlModel loaded successfully.");
		
		
		var userModelAndTagModel = require('./DaoModel/UserModelAndTagModel.js');
		userModelAndTagModel.createSchemaAndGetModel(mongoose, mongoosastic, Schema);
		console.log(" UserModelAndTagModel loaded successfully.");
		
		var tagModelAndNotificationModel = require('./DaoModel/TagModelAndNotificationModel.js');
		tagModelAndNotificationModel.createSchemaAndGetModel(mongoose, mongoosastic, Schema);
		console.log(" TagModelAndNotificationModel loaded successfully.");
	}
}; 