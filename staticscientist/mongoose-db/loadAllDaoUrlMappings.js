
module.exports = function (app) {

	console.log("In loadAllDaoUrlMapping !! loading... UserDaUrlMap");

	require('./DaoUrlMap/UserDaoUrlMap.js')(app);

	console.log("UserDaUrlMap loaded successfully..");

	require('./DaoUrlMap/TagDaoUrlMap.js')(app);

	console.log("tagDaUrlMap loaded successfully..");
	
	require('./DaoUrlMap/UserNotificationDaoUrlMap.js')(app);
	
	
	require('./DaoUrlMap/TagPageDtlDaoUrlMap.js')(app);
	
};