MyApp.controller('ProfilePageCntrl', ['$scope', '$routeParams', '$http', 'HtmlTags', '$sce', '$rootScope',
function($scope, $routeParams, $http, HtmlTags, $sce, $rootScope) {

	$scope.tagMp = new Object();
	$scope.isSubmit = 'submit';
	$scope.profile = {};

	$scope.initialize = function() {
		$scope.breifDetails = 'About me';
		$scope.tagMp["About me"] = "About me";
		$scope.tagMp["Edit"] = "Edit";
		$scope.profile.profileName = $rootScope.user.name;
		$scope.profile.profileAboutMe = $rootScope.user.aboutme;
		$scope.profile.profileLocation = $rootScope.user.location;
		$scope.profile.profilePhotoUrl = $rootScope.user.photourl;

	};
	$scope.getActiveTag = function(key) {

		if (key == 'Edit') {
			//switch
			$scope.breifDetails = 'Edit';
		} else if (key == 'About me') {
			//switch
			$scope.breifDetails = 'About me';
		}
	};
	$scope.submit = function() {
		$scope.isSubmit = 'loading';
		alert($rootScope.user.name + " " + $rootScope.user.location + " " + $rootScope.user.aboutme);
		$http({
			url : 'updateUserProfile',
			method : "POST",
			params : {
				name : $scope.profile.profileName,
				aboutme : $scope.profile.profileAboutMe,
				location : $scope.profile.profileLocation
			}
		}).then(function(resp) {
			$scope.isSubmit = 'submit';
			$rootScope.user.name = $scope.profile.profileName;
			$rootScope.user.aboutme = $scope.profile.profileAboutMe;
			$rootScope.user.location = $scope.profile.profileLocation;
			console.log(resp + "  updated success");

			var successMsg = HtmlTags.uploadSuccessAdminApproval;

		}, function(response) {// optional
			console.log(response + "  get error");
		});
	};

}]);
