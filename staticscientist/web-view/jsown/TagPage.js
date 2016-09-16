MyApp.controller('TagModuleCntrl', ['$scope', '$routeParams', '$http', 'HtmlTags', '$sce', '$rootScope',
function($scope, $routeParams, $http, HtmlTags, $sce, $rootScope) {

	$scope.tagPostList = [];
	$scope.tabSelect = '';

	$scope.tagMp = new Object();
	$scope.breifDetails = 'RecentTalents';
	$scope.pageBriefDesc = "The creation, performance, significance, and even the definition of music vary according to culture and social context.There are many types of music, including popular music, traditional music, art music and music written for religious ceremonies.";

	$scope.getActiveTag = function(text) {

		if (text.indexOf("Recent Talents") > -1) {
			$scope.breifDetails = 'RecentTalents';
			loadPagePosts($routeParams.pathName);

		} else if (text.indexOf("Edit") > -1) {
			$("li").removeClass('active');
			$(".navtabname2").closest('li').addClass('active');
			$scope.breifDetails = 'Edit';
		} else {
			$("li").removeClass('active');
			$(".navtabname2").closest('li').addClass('active');
			$scope.tagPostList = [];
			$scope.breifDetails = 'TagPage';
			$scope.pageBriefDesc = "Music is an art form or cultural activity whose medium is sound and silence. The common elements of music are pitch (which governs melody and harmony), rhythm (and its associated concepts tempo, meter, and articulation), dynamics, and the sonic qualities of timbre and texture (which are sometimes termed . In its most general form the activities describing music as an art form include the production of works of music (songs, symphonies, and so on), the criticism of music, the study of the history of music, and the aesthetic examination of music.The creation, performance, significance, and even the definition of music vary according to culture and social context. Indeed, throughout history, some new forms or styles of music have been criticized as  and early jazz in the beginning of the 1900s[3]. There are many types of music, including popular music, traditional music, art music and music written for religious ceremonies. Music ranges from strictly organized compositions (and their recreation in performance), through improvisational music such as jazz to aleatoric (chance-based) forms. Music can be divided into genres (e.g., rock music) and subgenres (e.g., punk rock), although the dividing lines and relationships between music genres are often subtle, sometimes open to personal interpretation, and occasionally controversial. Within the arts, music may be classified as a performing art, a fine art or as an auditory art. Music may be played or sung and heard live, part of a dramatic work (a music theater show or opera) or film or TV show, or it may be recorded and listened to on the radio or another music device";

		}

	};

	$scope.initialize = function() {

		$rootScope.whatsTranding = "BABA WATSAPP ZINDABAD";

		var pathName = $routeParams.pathName;

		$scope.tagMp["Recent Talents"] = "Recent Talents";
		$scope.tagMp["About " + pathName] = "About " + pathName;
		$scope.tagMp["Edit"] = "Edit";
		$scope.tagName = pathName;

		/* 	var tagListDtl = HtmlTags.tabHeadTagStart +
		 HtmlTags.tabUrlLiStart + 'active' + HtmlTags.tabUrlLiEnd + HtmlTags.tabUrlAStart+'"Recent Talents"'+ HtmlTags.tabUrlAEnd + HtmlTags.tabNameStart + 'Recent Talents' + HtmlTags.tabNameEnd +
		 HtmlTags.tabUrlLiStart + '' + HtmlTags.tabUrlLiEnd + HtmlTags.tabUrlAStart  + '"About:'+pathName+'"' +  HtmlTags.tabUrlAEnd + HtmlTags.tabNameStart + 'About '+pathName + HtmlTags.tabNameEnd +
		 HtmlTags.tabUrlLiStart + '' + HtmlTags.tabUrlLiEnd + HtmlTags.tabUrlAStart + '"Edit:'+pathName+'"'+HtmlTags.tabUrlAEnd +HtmlTags.tabNameStart + 'Edit' + HtmlTags.tabNameEnd +
		 HtmlTags.tabHeadTagEnd;

		 // Step 1: parse HTML into DOM element
		 var template = angular.element(tagListDtl);
		 // Step 2: compile the template
		 var linkFn = $compile(template);
		 // Step 3: link the compiled template with the scope.
		 var element = linkFn($scope);
		 // Step 4: Append to DOM (optional)
		 $("#appendHere").append(element);

		 */
		loadPagePosts(pathName);
	};

	function loadPagePosts(pathName) {
		$scope.pageBriefDesc = "The creation, performance, significance, and even the definition of music vary according to culture and social context.There are many types of music, including popular music, traditional music, art music and music written for religious ceremonies.";

		$http({
			url : 'getTagPagePost',
			method : "GET",
			params : {
				tagName : pathName
			}
		}).then(function(resp) {
			//alert(resp.data['TagDetail'].tagDetail);
			//alert(resp.data['TagPost']);
			var data = resp.data['TagPost'];
			$scope.pageBriefDesc = resp.data['TagDetail'].tagDetail;
			for (var i = 0; i < data.length; i++) {

				//console.log(data[i].notificationId.message);
				//console.log(data[i].notificationId.abtMsg);
				//console.log(data[i].notificationId.imageUrl);
				//console.log(data[i].userId);
				var htmlImgPostTag = '';
				var htmlPostTags = HtmlTags.startParentDivTag + HtmlTags.thumbsUpLogo + HtmlTags.startAppriciateCountTag + '129' + HtmlTags.endAppriciateCountTag + HtmlTags.shareLogo + HtmlTags.endParentDivTag;
				var aboutMessageTag = HtmlTags.pStartTag + data[i].notificationId.abtMsg + HtmlTags.pEndTag;
				var messageTag = HtmlTags.pStartTag + HtmlTags.bStartTag + data[i].notificationId.message + HtmlTags.pEndTag + HtmlTags.bEndTag;

				if (data[i].notificationId.imageUrl) {
					htmlImgPostTag = '<img src="' + data[i].notificationId.imageUrl + '" width="384px" height="300px"><br>';
				}

				var content = $sce.trustAsHtml(messageTag + aboutMessageTag + htmlImgPostTag + htmlPostTags);

				$scope.tagPostList.push(content);

			}

		}, function(response) {// optional
			alert(response + "  get error");
		});
	}

}]);
