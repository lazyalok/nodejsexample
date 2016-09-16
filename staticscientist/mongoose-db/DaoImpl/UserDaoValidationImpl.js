//below functions are used by internal purpose, dont have param request and response.

var userModelJS = require('../DaoModel/UserModel.js');

exports.ifUserNotExistInsertNode = function (userObj, callback) {

	console.log("called ....");
	var UserModel = userModelJS.getUserModel();

	UserModel.where('email', userObj.email).findOne(function (err, userModelObj) {

		if (err)
			return console.error("ERROR:: " + err);

		if (userModelObj == null) {

			console.log("USER NOT EXIST");

			var UserModel = userModelJS.getUserModel();

			var userModelObj = new UserModel({
					name : userObj.name,
					email : userObj.email,
					location :'',
					aboutme:'',
					intrest :'',
					views :'',
					pwd : '',
					tagfollow:[],
					photourl : userObj.photourl,
					firstTime : true
				});

			userModelObj.save(function (err, userModelObj) {
				if (err)
					return console.error("ERROR:: " + err);

				console.log('NEW USER UPDATED SUCCESSFULLY IN DB'); // 'name'
				callback(err,userModelObj);
			});

		} else if (userModelObj.email == userObj.email) {

			console.log("USER EXIST  " + userModelObj);
			callback(err,userModelObj); 

		}

	});
};