var Notification;
module.exports = {
	createSchemaAndGetModel : function(mongoose, mongoosastic, Schema) {
		//create schema

		notificationSchema = new Schema({
			date : {
				type : Date,
				default : Date.now()
			},
			offsetTime : {
				type : Number,
				default : function() {
					return new Date().getTime();
				}
			},
			message : String,
			abtMsg : String,
			imageUrl : String,
			videoUrl : [],
			audioUrl : [],
			totalLike : Number
		});

		//create model
		Notification = mongoose.model('Notifications', notificationSchema);

		console.log("Notifications model ready....");
	},

	getNotificationModel : function() {
		return Notification;
	}
};
