var UserModelAndTagModel;
module.exports = {

	createSchemaAndGetModel : function(mongoose, mongoosastic, Schema) {

		userModelAndTagModelSchema = new Schema({
			userId : {
				type : Schema.ObjectId,
				ref : 'Users'
			},
			tagId : {
				type : Schema.ObjectId,
				ref : 'Tags'
			}
		});
		UserModelAndTagModel = mongoose.model('UserAndTagRel', userModelAndTagModelSchema);
	},

	getUserModelAndTagModel : function() {
		return UserModelAndTagModel;
	}
}; 