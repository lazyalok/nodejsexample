var notificationModelJs = require('../DaoModel/NotificationModel.js');
var tagPageDtlModelJs = require('../DaoModel/TagPageDtlModel.js');
var userNotificationDaoImplJs = require('./UserNotificationDaoImpl.js');
var tagModelJS = require('../DaoModel/TagModel.js');
var tagModelAndNotificationModelJs = require('../DaoModel/TagModelAndNotificationModel.js');

exports.saveNotificationModel = function(req, res) {

	var msg = req.param('message');
	var tagsIds = req.param('tagsIds');
	var abtMsg = req.param('abtMsg');
	var imgPost = req.param('imgPost');
	var videoPost = req.param('vidPost');
	var audioPost = req.param('audPost');
	var user = req.user;
	var userId = req.user._id;
	var offsetTime = new Date().getTime();

	console.log("inside  save notification..." + msg + "  :  " + tagsIds + "  " + userId);

	var NotificationModel = notificationModelJs.getNotificationModel();

	var notificationModel = new NotificationModel({
		message : msg,
		abtMsg : abtMsg,
		imageUrl : imgPost,
		offsetTime : offsetTime
	});

	notificationModel.save(function(err, notificationModelObj) {
		if (err)
			return console.error("ERROR:: " + err);
		console.log('notificationModel model saved in database. ' + notificationModelObj._id);
		var notificationId = notificationModelObj._id;

		for (var m = 0; m < tagsIds.length; m++) {

			var TagModelAndNotificationModel = tagModelAndNotificationModelJs.getTagModelAndNotificationModel();
			var tagModelAndNotificationModel = new TagModelAndNotificationModel({
				notificationId : notificationId,
				tagId : tagsIds[m],
				createdOn : offsetTime
			});
			tagModelAndNotificationModel.save(function(err, tagModelAndNotificationModelObj) {
				if (err) {
					console.log("ERROR : while storing tag details " + err);
					throw err;
				}
			});
		}
		res.send("Post saved successfully...");
	});

};

//This method called from polling after few seconds.
//It will return top 4 notification based on posting time createdOn.
exports.getRegularNotification = function(req, res) {
	var userid = req.user._id;
	var offsetTime = req.param('offsetTime');
	var tagIds = req.param('tagIds');//or from session get map and get req.session.myTags//TODO::
	
	var tagModelAndNotificationModel = tagModelAndNotificationModelJs.getTagModelAndNotificationModel();
	tagModelAndNotificationModel.find().where('tagId').in(tagIds).where('createdOn').gt(offsetTime).limit(4).sort('-createdOn').populate('notificationId').exec(function(err, records) {
		console.log(records + "  I have collected this records");
		if (err) {
			console.log("Error ::::: getRegularNotification " + err);
		}
		res.send(records);
	});
};

