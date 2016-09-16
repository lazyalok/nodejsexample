
module.exports = function (app) {

	console.log("In UserDaoUrlMap !! loading... UserDaoImpl");
	var userDaoImpl = require('../DaoImpl/UserDaoImpl.js');

	app.post('/save.do', userDaoImpl.saveUserModel);
	app.get('/get.do', userDaoImpl.getUser);
	app.get('/search.do', userDaoImpl.searchUser);
	app.get('/followTag', userDaoImpl.followTag);
	app.get('/removeTag', userDaoImpl.removeTag);
	app.get('/getUserData.do', userDaoImpl.getUserData);
    app.post('/updateUserProfile', userDaoImpl.updateUserProfile);
    app.post('/followTagFirstTime', userDaoImpl.followTagFirstTime);
    
    
	
	console.log("UserDaImpl loaded successfully");
};