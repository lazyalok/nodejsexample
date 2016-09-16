MyApp.controller('HomePageCntrl', ['$scope', '$http', 'HtmlTags', '$timeout', '$sce',  '$rootScope','PollingService',
function($scope, $http, HtmlTags, $timeout, $sce, $rootScope, PollingService) {
	$scope.crntTime = new Date().getTime();

	$scope.getAllPaginatedTagPosts = function() {
		var currentTime = new Date().getTime();
		PollingService.pollHome(currentTime).then(function(data) {
			updatePostContents(data);
			pollData();
		});
	};

	function pollData() {
		//alert($scope.crntTime);

		PollingService.poll($scope.crntTime).then(function(data) {
			//console.log(data.length + "  baba data found");
			//alert($scope.crntTime+" after e");
			updatePostContents(data);
			$timeout(pollData, 15000);
		});
	};

	function updatePostContents(data) {
		if (data.length > 0) {
			var UniquePosts = [];
			for (var i = data.length - 1; i > 0; i--) {
				if (data[i].notificationId != null && UniquePosts.indexOf(data[i].notificationId._id) == -1) {
					UniquePosts.push(data[i].notificationId._id);

					var htmlPostTags = HtmlTags.startParentDivTag + HtmlTags.thumbsUpLogo + HtmlTags.startAppriciateCountTag + '' + HtmlTags.endAppriciateCountTag + HtmlTags.shareLogo + HtmlTags.endParentDivTag;
					var mainDivContId = HtmlTags.mainDivContianerId;

					$(htmlPostTags).hide().prependTo(mainDivContId).fadeIn("slow");

					$(HtmlTags.postedByDivStart + HtmlTags.postedByImgStart +$rootScope.user.photourl+ HtmlTags.postedByImgEnd + HtmlTags.postedByCoverStart + HtmlTags.postedByDateTimeStart + new Date(data[i].notificationId.offsetTime).toLocaleString() + HtmlTags.divEnd + HtmlTags.postedByNameStart + $rootScope.user.name + HtmlTags.divEnd + HtmlTags.awardBulbDivStart + HtmlTags.awardBulbGoldStart + 12 + HtmlTags.iEnd + HtmlTags.awardBulbSilverStart + 19 + HtmlTags.iEnd + HtmlTags.awardBulbBronzeStart + 123 + HtmlTags.iEnd + HtmlTags.divEnd + HtmlTags.divEnd + HtmlTags.divEnd).hide().prependTo(mainDivContId).fadeIn("slow");
					$scope.crntTime = data[i].notificationId.offsetTime;

					if (data[i].notificationId.imageUrl) {
						$('<img src="' + data[i].notificationId.imageUrl + '" width="384px" height="300px"><br><br><br>').hide().prependTo(mainDivContId).fadeIn("slow");
					}

					$(HtmlTags.pStartTag + data[i].notificationId.abtMsg + HtmlTags.pEndTag).hide().prependTo(mainDivContId).fadeIn("slow");
					$(HtmlTags.pStartTag + HtmlTags.bStartTag + data[i].notificationId.message + HtmlTags.pEndTag + HtmlTags.bEndTag).hide().prependTo(mainDivContId).fadeIn("slow");
				}
			}
		}
	}

}]);
