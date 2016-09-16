var tagModelJS = require('../DaoModel/TagModel.js');
var TagModelAndNotificationModelJs = require('../DaoModel/TagModelAndNotificationModel.js');

exports.saveTagModel = function(req, res) {

	var tagNameIn = req.param('tagName');

	console.log(tagNameIn + ' tag name');
	var TagModel = tagModelJS.getTagModel();

	var tagModelObj = new TagModel({
		tagName : tagNameIn,
		tagDetail : '',
		userIds : []
	});

	tagModelObj.save(function(err, tagModelObj) {
		if (err)
			return console.error("ERROR:: " + err);
		console.log('tag model saved in database.');
		// 'name'
	});
	res.send(" tag created successfully...");
};

exports.getAllTagModel = function(req, res) {

	var TagModel = tagModelJS.getTagModel();

	TagModel.find({}, function(err, tags) {
		if (err)
			return console.error("ERROR:: " + err);
		res.send(tags);
	});

};

exports.searchTag = function(req, res) {

	console.log("searhcing tag......");
	var tagNameIn = req.param('tagName');
	var TagModel = tagModelJS.getTagModel();
	var objects = [];
	TagModel.search({

		"query" : {
			"filtered" : {
				"filter" : {
					"limit" : {
						"value" : 3
					}
				},
				"query" : {
					"query_string" : {
						"analyze_wildcard" : true,
						"query" : "" + tagNameIn + "*"
					}
				}
			}
		}

	}, function(err, tags) {

		if (err) {
			console.error("ERROR while searching tag:: " + err);
			//	throw err;
		} else {
			console.log("found  tags success");
			objects = tags.hits.hits;
			console.log(objects);
		}
		//below is the approach we can find the value
		/*  for(var num in hits){
		 console.log(hits[num]._source.name);
		 } */
		res.send(objects);
	});

};

exports.removeAllTagFromElasticSrch = function(obj, callback) {
	var tagModelJS = require('../DaoModel/TagModel.js');
	var TagModel = tagModelJS.getTagModel();

	/* 	TagModel.esTruncate(function (err) {

	 if (err) {

	 console.log("ERROR : while removing data from elastic search.")
	 throw err;
	 }

	 callback(err,"DELETED TAGS FROM ELASTIC SEARCH SUCCESS!!");
	 }); */

};

exports.getTagPagePosts = function(req, res) {

	var tagObjMap = new Object();
	var tagNameIn = req.param('tagName');
	var TagModel = tagModelJS.getTagModel();
	var objects = [];
	var tagObjMap = new Object();

	var TagModel = tagModelJS.getTagModel();

	TagModel.where('tagName', tagNameIn).find(function(err, tagModelObj) {

		if (err) {
			Console.log('Error :: ' + err);
		} else {

			if (tagModelObj[0] != null) {

				tagObjMap['TagDetail'] = tagModelObj[0];

				//map with tag details //populate in scope in  UI.
				//and  paginated tag message
				//TagModelAndNotificationModel = get  All notification object with tag id   tagid--> All notifications.

				var tagIdElsc = tagModelObj[0]._id;
				console.log("found  tagswaaaaaaaa success  " + tagIdElsc);

				var TagModelAndNotificationModel = TagModelAndNotificationModelJs.getTagModelAndNotificationModel();

				TagModelAndNotificationModel.where('tagId', tagIdElsc).limit(10).sort('-createdOn').populate('notificationId').exec(function(err, paginatedTagPosts) {

					if (err) {
						console.log("ERROR : " + err);
					} else {

						tagObjMap['TagPost'] = paginatedTagPosts;
						res.send(tagObjMap);
					}
				});
			} else {
				res.send("NO TAG FOUND");
			}

		}
	});
};

//when user scrolls down or on first time load page
exports.getTagPaginatedPagePosts = function(req, res) {
	var userFollowedTagMap = req.session.myTags;

	console.log(userFollowedTagMap + " ----==userFollowedTagMap");
	var tagIds = [];
	for (key in userFollowedTagMap) {
		if (userFollowedTagMap.hasOwnProperty(key)) {
			tagIds.push(userFollowedTagMap[key]);
			//do something with value;
			
		}
	}
	var offsetTime = req.body.offsetTime;
	console.log(offsetTime +"  offsetTime "+tagIds);
	var TagModelAndNotificationModel = TagModelAndNotificationModelJs.getTagModelAndNotificationModel();

	TagModelAndNotificationModel.where('tagId').in(tagIds).where('createdOn').limit(10).sort({createdOn:'desc'}).populate('notificationId').exec(function(err, paginatedTagPosts) {

		if (err) {
			console.log("ERROR : " + err);
		} else {
			console.log("found first time getTagPaginatedPagePosts success  " + paginatedTagPosts);
			
			res.send(paginatedTagPosts);
		}
	});

};

//when  poll  happen
exports.getTagPaginatedPollingResult = function(req, res) {
	var userFollowedTagMap = req.session.myTags;

	console.log(userFollowedTagMap + " ----==userFollowedTagMap  getTagPaginatedPollingResult");
	var tagIds = [];
	for (key in userFollowedTagMap) {
		if (userFollowedTagMap.hasOwnProperty(key)) {
			tagIds.push(userFollowedTagMap[key]);
			//do something with value;
		}
	}

	//console.log("tagIds--===++  " + tagIds);
	//console.log(JSON.stringify(req.body) +'  req check dir'+req.body.offsetTime);
	var offsetTime = req.body.offsetTime;

	console.log(offsetTime + " ----==offsetTime");

	var TagModelAndNotificationModel = TagModelAndNotificationModelJs.getTagModelAndNotificationModel();

	TagModelAndNotificationModel.where('tagId').in(tagIds).where('createdOn').gt(offsetTime).limit(3).sort('-createdOn').populate('notificationId').exec(function(err, paginatedTagPosts) {

		if (err) {
			console.log("ERROR : " + err);
		} else {
			console.log("getTagPaginatedPollingResult--===++  " + paginatedTagPosts);
			res.send(paginatedTagPosts);
		}
	});

};
