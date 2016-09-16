var MyApp = angular.module('MyApp', ['ngAnimate', 'pollingModule', 'ngRoute', 'ui.bootstrap', 'ngRoute']);
MyApp.controller('postMyInvent', ['$scope', '$http', '$timeout', '$location', 'PollingService', '$rootScope', 'HtmlTags', '$modal',
function($scope, $http, $timeout, $location, PollingService, $rootScope, HtmlTags, $modal) {

	$http.defaults.cache = false;
	$scope.crntTime = new Date().getTime();

	//$scope.code = 'mk48xRzuNvA';
	//$scope.youtubeLink = '';

	$rootScope.whatsTranding = "BABA ZINDABAD";
	$scope.items = ['default', 'tags', 'review'];
	$scope.btnOptionItems = ['next1', 'next2', 'submit'];
	$scope.postInv1 = 'Post Your Invention default..We Appriciate..! ';
	$scope.postInv2 = 'Post Your Invention tags..We Appriciate..!';
	$scope.postInv3 = 'Post Your Invention review..We Appriciate..!';
	$scope.searchtagItemsFound = [];

	var tagstatusItems = ['tagfound', 'tagnotfound'];

	$('#tag-dropdown1').hide();
	$scope.totalTagSelected = new Object();

	$scope.manageTagStatus = "None";
	var weather = ["sun", "clouds", "rain", "hail", "snow"];

	$scope.lestInvent = function() {

		$scope.select = $scope.items[0];
		$scope.btnOption = $scope.btnOptionItems[0];
		$scope.user = {};
		$scope.user.invention = '';
		$scope.user.abtinvention = '';
		$scope.user.imgSrcinvention = '';
		$scope.user.tags = '';
		$scope.user.review = '';
		$scope.totalTagSelected = new Object();

	};

	$scope.next1 = function(user) {

		//alert($("#upload_iframe").contents().find("#upldImgtag"))
		if ($("#upload_iframe").contents().find("#upldImgtag").length) {
			var imgSrc = $("#upload_iframe").contents().find("#upldImgtag").attr('src');
			$scope.user.imgSrcinvention = imgSrc;
		} else {
			//alert("no img available");
		}

		//alert(tinyMCE.activeEditor.getContent() +" :@ "+$scope.user.imgSrcinvention);

		$scope.user.abtinvention = tinyMCE.activeEditor.getContent();
		tinyMCE.remove();

		//console.log($scope.totalTagSelected + ' total tag selected..' + $scope.user.imgSrcinvention);

		if ($scope.select == $scope.items[0]) {
			$scope.select = $scope.items[1];
			$scope.btnOption = $scope.btnOptionItems[1];
		} else if ($scope.select == $scope.items[1]) {
			$scope.select = $scope.items[2];
			$scope.btnOption = $scope.btnOptionItems[2];
			var str = "";
		} else {
			$scope.select = $scope.items[0];
		}

	};

	$scope.next2 = function(user) {
		$scope.select = $scope.items[2];
		$scope.btnOption = $scope.btnOptionItems[2];
		var str = "";
	};

	$scope.submit = function(user, id) {
		//alert($scope.user.invention + ' ' + $scope.user.tags + ' ' + $scope.user.review);
		$('#myModal').modal('hide');

		//$('.notifi').css("color", "red");
		//prepend data here
		//var myEl = angular.element(document.querySelector('.container-main'));
		//myEl.prepend('<p>' + $scope.user.invention + ' ' + $scope.user.tags + ' ' + $scope.user.review + '<p>');

		//get list of user id
		//post notification  and in user notification table add ref notification entry for all user by there userd ids.
		//$scope.totalTagSelected = []; //reset all slected tags.
		//console.log($scope.searchtagMap + " after submit " + $scope.user.tags + "  " + $scope.totalTagSelected);
		var userid = id;
		var msg = $scope.user.invention;
		var abtmsg = $scope.user.abtinvention;
		var imgInv = $scope.user.imgSrcinvention;

		var tagsIds = [];
		//alert(msg + "  :  " + abtmsg + "  " + imgInv);

		for (var k in $scope.totalTagSelected) {
			if ($scope.totalTagSelected.hasOwnProperty(k)) {
				//console.log (k+"  :  "+$scope.totalTagSelected[k] +"  :  "+$scope.user.invention);
				tagsIds.push($scope.totalTagSelected[k]);
			}
		}

		/***  async
		 iterate tag id
		 per tag id find user ids
		 per user id send notification
		 */
		$http({
			method : "POST",
			url : "/saveNotification",
			params : {
				"tagsIds[]" : tagsIds,
				message : msg,
				abtMsg : abtmsg,
				imgPost : imgInv
			}
		}).success(function(responseData) {
			alert("Your talent has been posted..." + responseData);
		});

		$scope.totalTagSelected = new Object();

	};

	$scope.tagSearch = function() {

		console.log("in tag search..");
		$scope.tagstatus = tagstatusItems[0];
		var charType = $("#tagsearch").val();

		charType = charType.trim();
		if (charType.length > 0) {
			$('#tag-dropdown1').show();
		} else {
			$('#tag-dropdown1').hide();
		}

		$http({
			url : 'searchTag',
			method : "GET",
			params : {
				tagName : charType
			}
		}).then(function(resp) {
			console.log("get success response " + resp);
			//below is the approach we can find the value
			$scope.searchtagItemsFound = [];
			$scope.searchtagMap = new Object();
			var count = Object.keys(resp.data).length;
			var datas = resp.data;
			if (0 < count) {
				// do stuff
				console.log("record found");
				$scope.tagstatus = tagstatusItems[0];
				for (var num in datas) {
					console.log(datas[num]._source);
					console.log(datas[num]._source.tagName + " tag name");
					console.log(datas[num]._id + " tag id");
					//$scope.searchtagItemsFound.push(datas[num]._source.tagName[0]);
					$scope.searchtagMap[datas[num]._source.tagName[0]] = datas[num]._id;
				}

			} else {

				if (charType.length > 0) {
					$('#tag-dropdown1').show();
					$scope.tagstatus = tagstatusItems[1];
				} else {
					$scope.tagstatus = tagstatusItems[0];
					console.log("no record");
					$('#tag-dropdown1').hide();
				}

			}
		}, function(response) {// optional
			alert(response + "  get error");
		});
	};

	$scope.getTagInfo = function(tagName, tagId) {
		$scope.totalTagSelected[tagName] = tagId;
		console.log("GOT : key " + tagName + " :  " + "VALUE : " + tagId);
	};

	$scope.removeTag = function(tagName) {
		console.log("removing.. tag");
		delete $scope.totalTagSelected[tagName];
		console.log("after remove  " + $scope.totalTagSelected);
	};

	$scope.createTag = function() {
		console.log("creating tag.. tag");
		console.log("new tag name " + $scope.user.tags);

		$http({
			url : 'savetag',
			method : "GET",
			params : {
				tagName : $scope.user.tags
			}
		}).then(function(resp) {

			console.log("tag created success");

		}, function(response) {// optional
			alert(response + "  get error while creating tag");
		});

	};

	$scope.changeImgUpload = function() {
		$("#uploadImg").submit();
	};

	$scope.editTagClick = function() {
		$scope.manageTagStatus = "manageTag";
		$scope.myManageTagList = new Object();

		$scope.myManageTagList["musics"] = "alok";
		$scope.myManageTagList["Arts & Education"] = "alok";
		$scope.myManageTagList["Entertainment"] = "alok";
		$scope.myManageTagList["life and Death"] = "alok";
		$scope.myManageTagList["rock & roll*"] = "alok";
		$('#manage-dropdown1').show();

	};

	$scope.manageTagSelect = function(tagName) {

		//	alert($scope.myManageTagList[tagName]);
		$scope.myTagList[tagName] = $scope.myManageTagList[tagName];
		//database update if already exist dont update

		$http({
			method : "GET",
			url : "/followTag",
			params : {
				tagName : tagName
			}
		}).success(function(responseData) {
			//alert("Success fully followed" + responseData)
		});

	};

	$scope.removeTagMyTagList = function(tagName) {
		delete $scope.myTagList[tagName];
		//database update

		$http({
			method : "GET",
			url : "/removeTag",
			params : {
				tagName : tagName
			}
		}).success(function(responseData) {
			//alert("Success fully followed" + responseData)
		});

		/* 	$http({
		 method : "POST",
		 url : "/getPaginatedUserData",
		 }).success(function (responseData) {
		 //alert("Success fully followed" + responseData)
		 }); */

	};

	$scope.manageTagSearch = function() {

		$scope.myManageTagList = new Object();
		var input = $("#manage-src").val();

		if (input.length > 0) {

			$http({
				url : 'searchTag',
				method : "GET",
				params : {
					tagName : input
				}
			}).then(function(resp) {
				console.log("get success manage response " + resp);
				var datas = resp.data;
				console.log(datas);
				for (var num in datas) {
					console.log(datas[num]._source.tagName + " tag name");
					console.log(datas[num]._id + " tag id");
					$scope.myManageTagList[datas[num]._source.tagName] = datas[num]._id;
				}
			});

			//$scope.myManageTagList["rock & roll*"]="alok";
		} else {
			$scope.manageTagStatus = "manageTag";
			$scope.myManageTagList = new Object();

			$scope.myManageTagList["musics"] = "alok";
			$scope.myManageTagList["Arts & Education"] = "alok";
			$scope.myManageTagList["Entertainment"] = "alok";
			$scope.myManageTagList["life and Death"] = "alok";
			$scope.myManageTagList["rock & roll*"] = "alok";
		}
	};

	$scope.initHomePage = function() {

		$rootScope.user = {};
		$scope.myTagList = new Object();
		$http({
			method : "GET",
			url : "/getUserData.do"
		}).success(function(response) {
			//alert("Success fully followed" + response);
			console.log(" in page : " + response.name);
			console.log(" in page : " + response._id);
			console.log(" in page : " + response.email);
			console.log(" in page : " + response.location);
			console.log(" in page tag follow : " + response.tagfollow);
			console.log(" in page image : " + response.photourl);

			$rootScope.user.name = response.name;
			$rootScope.user.email = response.email;
			$rootScope.user.location = response.location;
			$rootScope.user.aboutme = response.aboutme;
			$rootScope.user.photourl = response.photourl;
			$scope.firstTime = response.firstTime;

			//alert($scope.firstTime);

			if ($scope.firstTime) {
				$modal.open({
					templateUrl : '/talent/FirstTimeDialogue.html',
					windowClass : 'app-modal-window',
					size : 'lrg'
				});
			} else {
				var tagsResponse = response.tagfollow;
				for (var i = 0; tagsResponse.length > i; i++) {
					$scope.myTagList[tagsResponse[i]] = tagsResponse[i];
				}
				
				//alert("baba");

			//	getAllPaginatedTagPosts();
			}
		});

	};

	$scope.successUpload = function() {
		$('.uploader-over-post-overlay').hide();
		$('.uploader-over-post').hide();
		alert(tinyMCE.activeEditor.getContent());
	};

	$scope.closeUploadImgBox = function() {
		$('.uploader-over-post-overlay').hide();
		$('.uploader-over-post').hide();
	};

	$scope.loadTagPage = function(path) {
		$scope.pathName = path;
		$location.path(path);
	};

	$scope.changeVideoLink = function(val) {
		//alert($('#youtubeLink').val() + " :: " + $scope.youtubeLink);
		var url = $('#youtubeLink').val();
		var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
		var match = url.match(regExp);
		if (match) { https://www.youtube.com/watch?v=Bwu1x8hfEIo
			loadVideo($('#youtubeLink').val());
		} else {
			alert("invalid url");
		}
	};

	

	/*
	 function loadVideo(youtubeLink) {
	 var vidId = getYouTubeId(youtubeLink);
	 if (vidId.length > 0) {
	 $scope.code = vidId;
	 }
	 };

	 function getYouTubeId(Url) {
	 var video_id = Url.split('v=')[1].split('&')[0];
	 return video_id;
	 };*/
}]);

