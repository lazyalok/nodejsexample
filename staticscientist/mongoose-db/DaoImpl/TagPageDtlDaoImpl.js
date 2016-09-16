var tagPageDtlModelJS = require('../DaoModel/TagPageDtlModel.js');

exports.getTagPageDtlPaginated = function(req, res) {

	var tagId = req.param('tagId');

	console.log("Tag id found " + tagId);

	var TagPageDtlModel = tagPageDtlModelJS.getTagPageDtlModel();

	console.log("TagPageDtlModel..... ");

	TagPageDtlModel.find().where('tagId', tagId).limit(2).populate('notificationId').exec(function(err, results) {

		if (err) {
			throw err;
		}

		console.log("all result find success.. " + results.length);

		res.send(results);
	});
};

