var pollingModule = angular.module('pollingModule', []);

pollingModule.factory('PollingService', function($http, $timeout) {
	
	var poller = function(offsetTime) {
		return $http.post("/notifyme",{offsetTime: offsetTime},{"headers" : { "Content-Type" : "application/json; charset=UTF-8" }}).then(function(responseData) {
			console.log(responseData.data);
			return responseData.data;
		});
	};
		
	var pollerHome = function(offsetTime) {
		return $http.post("/notifymeHome",{offsetTime: offsetTime},{"headers" : { "Content-Type" : "application/json; charset=UTF-8" }}).then(function(responseData) {
			console.log(responseData.data);
			return responseData.data;
		});
	};


	return {
		poll : poller,
		pollHome : pollerHome
	};
	
	return {
		poll : poller,
		pollHome : pollerHome
	};

});

