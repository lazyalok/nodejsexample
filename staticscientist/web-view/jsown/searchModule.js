MyApp.controller('search', ['$scope', '$http',
function($scope, $http) {

	$('#srch-dropdown1').hide();

	$scope.onSearch = function() {

		var charType = $("#srch-term").val();

		charType = charType.trim();
		if (charType.length > 0) {
			$('#srch-dropdown1').show();
		} else {
			$('#srch-dropdown1').hide();
		}

	};
}]); 