var TAGS;
module.exports = {
	createSchemaAndGetModel : function(mongoose, mongoosastic, Schema) {
		//create schema
		var tagSchema = new Schema({
			tagDetail : String,
			tagName : {
				type : [String],
				es_indexed : true
			} ,
			tagOwner : String
		});
		tagSchema.plugin(mongoosastic);
		//create model
		TAGS = mongoose.model('tags', tagSchema);

		console.log("Tag model ready....");
	},

	getTagModel : function() {
		return TAGS;
	}
};
