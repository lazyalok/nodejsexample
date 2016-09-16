var TagModelAndNotificationModel;
module.exports = {

	createSchemaAndGetModel : function(mongoose, mongoosastic, Schema) {

		tagModelAndNotificationModelSchema = new Schema({
			tagId : {
				type : Schema.ObjectId,
				ref : 'Tags'
			},
			notificationId : {
				type : Schema.ObjectId,
				ref : 'Notifications'
			},
			createdOn : {
				type : Number,
				default : function() {
					return new Date().getTime();
				}
			}

		});
		TagModelAndNotificationModel = mongoose.model('TagAndNotificationRel', tagModelAndNotificationModelSchema);
	},

	getTagModelAndNotificationModel : function() {
		return TagModelAndNotificationModel;
	}
};
