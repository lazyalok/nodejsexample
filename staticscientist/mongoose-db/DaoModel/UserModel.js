var UserModel;
module.exports = {
	createSchemaAndGetModel : function(mongoose, mongoosastic, Schema) {
		//create schema

		var userSchema = new Schema({
			name : {
				type : String,
				es_indexed : true
			},
			email : {
				type : String,
				es_indexed : true
			},
			location : String,
			aboutme : String,
			intrest : String,
			views : Number,
			pwd : String,
			photourl : String,
			tagfollow : [],
			firstTime : {
				type : Boolean,
				default : true
			}

		});
		userSchema.plugin(mongoosastic);
		//create model
		UserModel = mongoose.model('Users', userSchema);
	},

	getUserModel : function() {
		//get new model object
		return UserModel;

	}
}; 