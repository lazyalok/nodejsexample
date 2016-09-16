var userModelJS = require('../DaoModel/UserModel.js');
var userModelAndTagModelJs = require('../DaoModel/UserModelAndTagModel.js');
var tagModelJS = require('../DaoModel/TagModel.js');

exports.saveUserModel = function(req, res) {

	var nameIn = req.param('name');
	var pwdIn = req.param('pwd');

	console.log(userModelJS + '  ' + nameIn + '  ' + pwdIn);
	var UserModel = userModelJS.getUserModel();

	console.log(UserModel);

	var userModelObj = new UserModel({
		name : nameIn,
		email : '',
		pwd : pwdIn,
		photourl : ''
	});
	userModelObj.save(function(err, userModelObj) {
		if (err)
			return console.error("ERROR:: " + err);
		console.log('user model saved in database.');
		// 'name'
	});
	res.send(" user updated successfully...");
};

exports.updateUserProfile = function(req, res) {

	var userId = req.user._id;
	var location = req.param('location');
	var aboutme = req.param('aboutme');
	var name = req.param('name');

	console.log(userId + " " + aboutme + " " + name + "  -------+++");
	var UserModel = userModelJS.getUserModel();

	var query = {
		_id : userId
	};

	UserModel.update(query, {
		location : location,
		aboutme : aboutme,
		name : name
	}, {
		multi : true
	}, function(err, respond) {
		if (err) {
			res.send("server busy this time");
		} else {
			res.send("updated sucess");
		}

	});

};

exports.getUser = function(req, res) {

	var nameIn = req.param('name');
	var UserModel = userModelJS.getUserModel();

	UserModel.where('name', nameIn).findOne(function(err, userModelObj) {

		if (err)
			return console.error("ERROR:: " + err);
		console.log('user find  in database. ' + userModelObj);
		// 'name'

	});
	res.send(" user find successfully...");
};

exports.searchUser = function(req, res) {

	var nameIn = req.param('name');
	var UserModel = userModelJS.getUserModel();
	var objects = [];
	UserModel.search({
		"match" : {
			"name" : nameIn
		}

	}, function(err, user) {
		console.log("found");

		if (err) {
			console.error("ERROR while searching name:: " + err);
			throw err;
		} else {

			objects = user.hits.hits;
			console.log(objects);
		}
		//below is the approach we can find the value
		/*  for(var num in hits){
		 console.log(hits[num]._source.name);
		 } */
		res.send(objects);
	});

};

exports.getUserData = function(req, res) {

	var UserModel = userModelJS.getUserModel();

	var userId = req.user._id;

	console.log("userID found " + userId);

	UserModel.where('_id', userId).findOne(function(err, usermodel) {
		//	console.log("userID found " + usermodel);
		//wrong

		// get  tags info from
		//console.log(req.session.myTags + '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-');
		//res.send(usermodel);

		var UserModelAndTagModel = userModelAndTagModelJs.getUserModelAndTagModel();

		UserModelAndTagModel.find({
			userId : userId
		}).exec(function(err, tags) {
			if (err) {
				console.log("Error ::::: getUserData " + err);
			}

			//console.log("tags :::::.. " + tags);

			var userFollowedTagIds = [];
			var userFollowedTagNames = [];
			var userFollowedTagMap = new Object();

			for (var i = 0; tags.length > i; i++) {
				console.log("Tag fetch :::::.. " + tags[i].tagId);

				userFollowedTagIds.push(tags[i].tagId);

			}
			//console.log("userFollowedTagIds:::::.. " + userFollowedTagIds);

			var tagModelObj = tagModelJS.getTagModel();

			tagModelObj.find().where('_id').in(userFollowedTagIds).exec(function(err, tagsRecord) {

				console.log("Tag fetch :::::.. " + tagsRecord);
				for (var i = 0; tagsRecord.length > i; i++) {
					userFollowedTagNames.push(tagsRecord[i].tagName); // TODO : it should be a Map containing tag id as tagname and value as tag id
					console.log("tagsRecord[i].tagName:::::.. " + tagsRecord[i].tagName);
					
					userFollowedTagMap[tagsRecord[i].tagName]=tagsRecord[i]._id;
				}
				usermodel.tagfollow = userFollowedTagNames;
				
				
				req.session.myTags = userFollowedTagMap; //put this map in session here 
				//console.log("Tag fetch :::::.. " + req.session.myTags + "  -=-=-=-=-=-=-=userFollowedTagNames-=-=-= " + userFollowedTagNames);
				res.send(usermodel);

			});

		});

	});

};

exports.followTag = function(req, res) {

	var userId = req.user._id;
	var tagNameIn = req.param('tagName');
	// user and tag model update
	//session update

	var TagModel = tagModelJS.getTagModel();

	TagModel.where('tagName', tagNameIn).findOne(function(err, tagmodel) {

		var UserModelAndTagModel = userModelAndTagModelJs.getUserModelAndTagModel();

		console.log('tagmodel id ......' + tagmodel);

		var userModelAndTagModelObj = new UserModelAndTagModel({
			userId : userId,
			tagId : tagmodel._id
		});

		userModelAndTagModelObj.save(function(err, userModelAndTagModelObj) {
			if (err) {
				console.error("ERROR:: followTag " + err);
				res.send("tag update failed...");
			} else {
				
				var userFollowedTagMap = req.session.myTags;   //TODO:: Remove this code and new tag in map(tagNameIn), myTags should return tags map. 
				userFollowedTagMap[tagNameIn]=tagmodel._id;
				req.session.myTags = userFollowedTags;
				res.send("tag addedd success");
			}

		});

	});

	//session  tag name update

};

exports.removeTag = function(req, res) {

	var userId = req.user._id;
	var tagNameIn = req.param('tagName');
	// user and tag model update
	//session update
	

	var TagModel = tagModelJS.getTagModel();

	TagModel.where('tagName', tagNameIn).findOne(function(err, tagmodel) {

		var UserModelAndTagModel = userModelAndTagModelJs.getUserModelAndTagModel();

		console.log('tagmodel id ......' + tagmodel);

		UserModelAndTagModel.find({
			tagId : tagmodel._id
		}).remove().exec(function(err, records) {
			if (err) {
				console.log("Error ::::: removeTag " + err);
			}
			console.log(" records " + records);

			/*
			var userFollowedTags = req.session.myTags;  // TODO remove this code and just put delete key(tagNameIn ) from map , myTags should return tags map. 
						var index = userFollowedTags.indexOf(tagNameIn);
						if (index > -1) {
							userFollowedTags.splice(index, 1);
						}
						req.session.myTags = userFollowedTags;*/
						
				var userFollowedTagMap = req.session.myTags;   //TODO:: Remove this code and new tag in map(tagNameIn), myTags should return tags map. 
				delete userFollowedTagMap[tagNameIn];
				req.session.myTags = userFollowedTagMap;
			
			    res.send("tag removed success");
			
		});
	});

	//remove().exec();

	// user and tag model update
	//session follow tag ids update
	//session  tag name update

};

exports.followTagFirstTime = function(req, res) {

	var userId = req.user._id;
	var isUserFirstTime = req.user.firstTime;
	var tagsSelected = req.param('tagsSelected[]');
	//get tag ids
	console.log('user and tag all details......' + req.session);
	var tagModelObj = tagModelJS.getTagModel();

	tagModelObj.find().where('tagName').in(tagsSelected).exec(function(err, records) {
		if (err) {
			console.log("Error ::::: followTagFirstTime " + err);
		}
		console.log(" records :::::  " + records[0]._id);

		var UserModelAndTagModel = userModelAndTagModelJs.getUserModelAndTagModel();
		//for loop tag iterate and populate
		for (var i = 0; records.length > i; i++) {

			console.log('storing tag selected ....' + records[i]._id+"  record name "+records[i].tagName); //TODO put this in map tagName as key and value as id and then put it in session
			var userModelAndTagModelObj = new UserModelAndTagModel({

				userId : userId,
				tagId : records[i]._id
			});

			userModelAndTagModelObj.save(function(err, userModelAndTagModelObj) {
				if (err)
					return console.error("ERROR:: " + err);
				console.log('user and tag model saved successfully....');
			});
		}

		var UserModel = userModelJS.getUserModel();

		var query = {
			_id : userId
		};

		UserModel.update(query, {
			firstTime : false
		}, function(err, respond) {
			if (err) {
				console.error("ERROR:: " + err);
				res.send("server busy this time");
			} else {
				res.send("updated sucess");
			}

		});
	});

	//user below code for creating tags
	/*
	var TagModel = tagModelJS.getTagModel();

	for (var i = 0; tagsSelected.length > i; i++) {
	var tagModel = new TagModel({
	tagDetail : 'Its all about...  ' + tagsSelected[i],
	tagName : tagsSelected[i],
	tagOwner : 'Admin'
	});

	tagModel.save(function(err, tagModelObj) {
	if (err) {
	console.log("ERROR : while storing tag details " + err);
	throw err;
	}
	console.log("tag saved.....");

	});
	}*/
	// user and tag model update
	//session follow tag ids update
	//session follow tag name update
	//usermodel update  isUserFirstTime = true;
};
