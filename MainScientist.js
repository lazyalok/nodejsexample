var express = require('express');
var cookieParser = require('cookie-parser')();
var session = require('cookie-session')({
	secret : 'secret'
});
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var mkdirp = require('mkdirp');
var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var multer = require('multer');
var Schema = mongoose.Schema;

var storage = multer.diskStorage({
	destination : function(req, file, cb) {
		cb(null, './uploads');
	},
	filename : function(req, file, cb) {
		console.log(file);
		cb(null, Date.now() + '-' + file.originalname);
	}
});

var options = {
	secret : "a secret key for session",
};

//var app = require("sockpress").init(options);
var app = express();
var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

app.set('env', 'dev');
if ('dev' == app.get('env')) {
	app.use("/", express.static(__dirname + '/staticscientist/web-view/'));
	app.use(session);
	app.use(cookieParser);
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(router);
	app.use(bodyParser.urlencoded({
		extended : false
	}));
	app.use(bodyParser.json());
	app.use(multer({
		storage : storage
	}).single('photo'));
}
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(8081, '127.0.0.1');

console.log("In Main Scientist.. loading all modules...");
var loadDBAndAllModels = require('./staticscientist/mongoose-db/loadAllModel.js');
loadDBAndAllModels.loadDBConnAndModels();

require('./staticscientist/mongoose-db/loadAllDaoUrlMappings.js')(app);

console.log("In Main Scientist.. all modules loaded successfully !!");

//authentication--> start

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

var UserObj = {
	name : '',
	email : '',
	pwd : '',
	photourl : '',
	tagfollow : []
};

passport.use(new FacebookStrategy({
	clientID : 1513443402281467,
	clientSecret : '989ccdb169ed36a92a148320e0dcf16a',
	callbackURL : "",//TODO:: use facebook callback url..you have to register it.
	profileFields : ['id', 'displayName', 'emails', 'photos','profileUrl']
}, function(accessToken, refreshToken, profile, done) {


	//console.log(accessToken);
	
	//console.log(profile._json);
	//console.log(profile.bio);
	//console.log(profile._json.bio);
	console.log(profile.profileUrl);
	console.log(profile.id);
	console.log(profile.displayName);
	console.log(profile.photos[0].value +"  "+profile.photos[1]+" "+profile.photos[3]);
	console.log(profile.emails[0].value);

	UserObj.name = profile.displayName, UserObj.email = profile.emails[0].value, UserObj.pwd = '', UserObj.photourl = profile.photos[0].value, UserObj.tagfollow = [], UserObj.notification = [];

	//pass  UserObj to check value in db ifUserNotExistInsertNode

	var userValid = require('./staticscientist/mongoose-db/DaoImpl/UserDaoValidationImpl.js');

	userValid.ifUserNotExistInsertNode(UserObj, function(err, user) {

		console.log("calling done..." + user);
		if (user) {
			user.photourl = profile.photos[0].value;
			user.name = profile.displayName;
			console.log("calling done..." + user.tagfollow);
			return done(null, user);
		} else
			return done(null, false, {
				message : 'Incorrect password.'
			});
	});

}));

app.get('/auth/facebook', passport.authenticate('facebook', {
	scope : ['email']
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect : '/homeone',
	failureRedirect : '/error.html'
}));

/*Authentication completed by facebook*/

/*Request Url Matching start*/

app.post('/api/photos', function(req, res) {
	// Everything went fine
	console.log(req.file.filename + " gottttttt " + req.originalUrl);

	res.send("<img id='upldImgtag' src='http://192.168.1.5:8081/uploads/" + req.file.filename + "' height='134px'  width='162px' />");
});

app.get('/uploads/*', function(req, res) {

	console.log(__dirname + req.originalUrl);
	res.sendFile(__dirname + req.originalUrl);
});

app.get('/logout.do', function(req, res) {

	console.log("in logout");
	req.logout();
	res.redirect('/');

});

//login page first time
app.get('/', function(req, res) {
	console.log("home page....welcome!! " + __dirname);
	res.sendFile(__dirname + '/staticscientist/web-view/pages/login.html');
});

//home page
app.get('/homeone', function(req, res) {
	console.log("home page....welcome!! " + __dirname);
	res.sendFile(__dirname + '/staticscientist/web-view/pages/test.html');
});

app.get('/header', function(req, res) {
	console.log("header page....welcome!! ");
	res.sendFile(__dirname + '/staticscientist/web-view/pages/header.html');
});

app.get('/talent/*', function(req, res) {
	//check user logged in or not TODO::
	var urlPattern = req.originalUrl;
	urlPattern = urlPattern.replace("/talent/", "");
	res.sendFile(__dirname + '/staticscientist/web-view/pages/' + urlPattern);
});

/*Request Url Matching End*/

