var IndexAPP = angular.module('IndexAPP', ['ngResource', 'ngRoute']);

/*
 * routes for saindex.html
 */
console.log("here is fine");
IndexAPP.config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: '/MainHtml/mainpage.html',
        controller: 'MainController'
    }).
    when('/activity', {
        templateUrl: '/MainHtml/activity.html',
        controller: 'ActivityController'
    }).
    when('/download', {
        templateUrl: '/MainHtml/download.html',
        controller: 'DownloadController'
    }).
    when('/groupon', {
        templateUrl: '/MainHtml/groupon.html',
        controller: 'GrouponController'
    }).
    when('/school', {
        templateUrl: '/MainHtml/school.html',
        controller: 'SchoolController'
    });

    // configure html5 to get links working on jsfiddle
    // $locationProvider.html5Mode(true);
    console.log("initialize route");
});

IndexAPP.controller('IndexController', function($scope, $resource, $routeParams, $location) {
	$scope.register_show = false;
	$scope.login_show = false;
	$scope.otherfuction_show = false;
	$scope.feedback_show = false;
	$scope.agree = true;


});

IndexAPP.controller('MainController', function($scope, $resource, $routeParams, $location) {
    $scope.getMerchantsLogo = function () {
        $resource("/merchant/logos").get({}, function(res) {
            console.info(res);
            if (res.mess = "success") {
                
            } else{
                cosole.log(res.mess);
            };
        }); 
    }
});

IndexAPP.controller('ActivityController', function($scope, $resource, $routeParams, $location) {

});

IndexAPP.controller('DownloadController', function($scope, $resource, $routeParams, $location) {

});

IndexAPP.controller('GrouponController', function($scope, $resource, $routeParams, $location) {

});

IndexAPP.controller('SchoolController', function($scope, $resource, $routeParams, $location) {

});