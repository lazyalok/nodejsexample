var UserNotificationModel;
module.exports = {
	createSchemaAndGetModel : function(mongoose, mongoosastic, Schema) {
		//create schema
		userNotificationSchema = new Schema({
			userid : {
				type : Schema.ObjectId,
				ref : 'Users'
			},
			notificationid : {
				type : Schema.ObjectId,
				ref : 'Notification'
			},
			read : {
				type : Boolean,
				default : false
			},
			createdOn : {
				type : Number,
				default : function() {
					return new Date().getTime();
				}
			}
		});

		//create model
		UserNotificationModel = mongoose.model('UserNotification', userNotificationSchema);
	},

	getUserNotificationModel : function() {
		return UserNotificationModel;
	}
}; 