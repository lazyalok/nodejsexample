
module.exports = function (app) {

	console.log("In UserDaoUrlMap !! loading... UserDaoImpl");
	var notificationDaoImpl = require('../DaoImpl/NotificationDaoImpl.js');
	var userNotificationDaoImpl = require('../DaoImpl/UserNotificationDaoImpl.js');
	
	app.post('/saveNotification', notificationDaoImpl.saveNotificationModel);

	console.log("notificationDaoImpl loaded successfully");
	
   // app.post('/notifyme', notificationDaoImpl.getRegularNotification);
	
	app.post('/getPaginatedUserData', userNotificationDaoImpl.getPaginatedUserNotifications);
	
	
	
};