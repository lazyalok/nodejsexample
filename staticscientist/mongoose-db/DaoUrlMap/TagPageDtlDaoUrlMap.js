
module.exports = function (app) {

	console.log("In TagPageDtlDaoUrlMap !! loading... TagPageDtlDaoImpl");
	var tagPageDtlDaoImpl = require('../DaoImpl/TagPageDtlDaoImpl.js');

	app.get('/getTagPageDtls', tagPageDtlDaoImpl.getTagPageDtlPaginated);
	
};