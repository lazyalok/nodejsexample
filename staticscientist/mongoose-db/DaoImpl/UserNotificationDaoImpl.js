var userNotificationModelJS = require('../DaoModel/UserNotificationModel.js');

exports.saveUserNotificationModel = function(userid, notificationid, callback) {

	var UserNotificationModel = userNotificationModelJS.getUserNotificationModel();

	var userNotificationObj = new UserNotificationModel({
		userid : userid,
		notificationid : notificationid
	});

	userNotificationObj.save(function(err, notificationModelObj) {
		if (err)
			return console.error("ERROR::  in user notification daoimpl " + err);
		console.log("SAVED !!!! usernotification");
		callback(err, notificationModelObj);
	});

};

exports.getPaginatedUserNotifications = function(request, response) {

	var userId = request.user._id;
	console.log("trying to call paginated data..." + userId);
	var UserNotificationModel = userNotificationModelJS.getUserNotificationModel();

	UserNotificationModel.find().where('userid', userId).populate({
		path : 'notificationid'
	}).sort({
		createdOn : 'desc'
	}).skip(0).limit(5).exec(function(err, resp) {

		if (err)
			return console.error("ERROR::  while  user data  fetching " + err);

		console.error("SUCCESS ::  while  user data  fetching " + resp);
		response.send(resp);
	});

};

