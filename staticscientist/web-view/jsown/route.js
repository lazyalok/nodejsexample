MyApp.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {

	$routeProvider.when('/home', {
		templateUrl : '/talent/test1.html',
		controller : 'HomePageCntrl',
		resolve : {
			// function that returns a promise
		}
	}).when('/profilepage', {
		templateUrl : '/talent/ProfilePage.html',
		controller : 'ProfilePageCntrl',
		resolve : {
			// function that returns a promise
		}
	}).when('/:pathName', {
		templateUrl : '/talent/tata.html',
		controller : 'TagModuleCntrl',
		paramExample : 'alok',
		resolve : {
			// function that returns a promise
		}
	}).otherwise({
		redirectTo : '/home'
	});
}]);

MyApp.constant('HtmlTags', {

	//main row middle div
	mainDivContianerId : "#container-mainid",
	//post content
	startParentDivTag : "<br><div class='additionalOpt'>",
	endParentDivTag : "</div><br>",
	thumbsUpLogo : "<i class='fa fa-thumbs-up thumbs-up-zoom'></i>",
	startAppriciateCountTag : "<span class='numberAppriciate'>",
	endAppriciateCountTag : "</span>",
	shareLogo : "<i class='share fa fa-share-square-o'></i>",
	//common html tag
	pStartTag : "<p>",
	pEndTag : "</p>",
	bStartTag : "<b>",
	bEndTag : "</b>",
	//tab tags
	tabHeadTagStart : "<div class='tabs-head'><ul class='nav nav-tabs' role='tablist' id='tablist'>",
	tabUrlLiStart : "<li class='",
	tabUrlLiEnd : "'>",
	tabUrlAStart : "<a href='javascript:void(0)' ng-click='getActiveTag(",
	tabUrlAEnd : ")' role='tab' data-toggle='tab'> ",
	tabNameStart : "<span class='lgt-black'>",
	tabNameEnd : "</span></a></li>",
	tabHeadTagEnd : "</ul></div>",
	//upload success
	uploadSuccessAdminApproval : '<p class="bg-info">Successfully Updated..Pending for Admin Approvals.</p>',
	
	postedByDivStart :'<div class="posted-by">',
	 divEnd : '</div>',
	 iEnd :'</i>',
	postedByImgStart :'<img id="profImgLogo" class="img-responsive posted-by-img  img-circle" src="',
	postedByImgEnd : '">',
	postedByCoverStart :'<div class="float-left w66">',
	postedByDateTimeStart : '<div class="posted-by-datetime">',
	postedByNameStart : '<div class="posted-by-name">',
	awardBulbDivStart :'<div class="award-bulb">',
	awardBulbGoldStart :'<i class="fa fa-lightbulb-o fa-lg line-hgt2 icon-mng gold-bulb" title="Gold Bulb">',
	awardBulbSilverStart :'<i class="fa fa-lightbulb-o fa-lg line-hgt2 icon-mng silver-bulb" title="Silver Bulb">',
	awardBulbBronzeStart : '<i class="fa fa-lightbulb-o fa-lg line-hgt2 icon-mng bronze-bulb" title="Bronze Bulb">'
});


/*
MyApp.directive('myYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<div><iframe style="overflow:hidden;" width="230px" height="150px" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
    link: function (scope) {
        console.log('here');
        scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
           }
        });
    }
  };
});
*/

