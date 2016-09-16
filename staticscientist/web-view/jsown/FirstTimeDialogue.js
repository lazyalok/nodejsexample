/*
MyApp.controller('FirstTimeDialogueCntrl', ['$scope', '$routeParams', '$http', 'HtmlTags', '$sce', '$rootScope',
function($scope, $routeParams, $http, HtmlTags, $sce, $rootScope) {

	$scope.initFirstTimeDialogue = function() {

		$scope.pageNames = ['UserInfo', 'SelectFavTags'];
		$scope.pageName = $scope.pageNames[0];
		//call db get  top 10  tag for selections
		//enter there name as key and id as value
		$scope.slectedTagListMp = new Object();
		//now show them in second page
		
	

	};

	$scope.next = function(pageName) {
		$scope.pageName = $scope.pageNames[1];
	};

	$scope.submit = function() {

	};

	$scope.tagSelect = function(tagName) {
		var val = $scope.slectedTagListMp[tagName];

		if (val != null && val.length > 0) {
			$scope.slectedTagListMp[tagName];
			$scope.minimumTagCount--;
		} else {
			$scope.minimumTagCount++;
		}
	};
	
	$scope.tagImageMouseOver = function() {
		
		//alert("babaaa");
		angular.element(this).find(".checkTag").css("display", "block");
	};
	

}]);


*/
