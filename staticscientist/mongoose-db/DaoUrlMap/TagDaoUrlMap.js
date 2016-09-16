module.exports = function(app) {

	console.log("In TagDaoUrlMap !! loading... TagDaoImpl");
	var tagDaoImpl = require('../DaoImpl/TagDaoImpl.js');

	app.get('/savetag', tagDaoImpl.saveTagModel);
	app.get('/searchTag', tagDaoImpl.searchTag);
	app.get('/getAllTags', tagDaoImpl.getAllTagModel);
	app.get('/getTagPagePost', tagDaoImpl.getTagPagePosts);
	app.get('/getTagPaginatedPagePosts', tagDaoImpl.getTagPagePosts);	
  	app.post('/notifyme', tagDaoImpl.getTagPaginatedPollingResult);
  	app.post('/notifymeHome', tagDaoImpl.getTagPaginatedPagePosts);
  	
	console.log("tagDaoImpl loaded successfully");
};