var TagPageDtlModel;
module.exports = {
	createSchemaAndGetModel : function (mongoose, mongoosastic, Schema) {

		tagPageDtlSchema = new Schema({
				userId : {
					type : Schema.ObjectId,
					ref : 'Users'
				},
				notificationId : {
					type : Schema.ObjectId,
					ref : 'Notifications'
				},
				tagId : {
					type : Schema.ObjectId,
					ref : 'Tags'
				}
			});
		TagPageDtlModel = mongoose.model('TagPageDtl', tagPageDtlSchema);
	},

	getTagPageDtlModel : function () {
		return TagPageDtlModel;
	}

};