var indexAPP = angular.module('indexAPP', ['ngResource', 'ngRoute']);

/*
 * routes for saindex.html
 */
indexAPP.config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'html/MainHtml/main.html',
        controller: 'mainController'
    }).
    when('/activity', {
        templateUrl: 'html/MainHtml/activity.html',
        controller: 'activityController'
    }).
    when('/download', {
        templateUrl: 'html/MainHtml/download.html',
        controller: 'downloadController'
    }).
    when('/groupon', {
        templateUrl: 'html/MainHtml/groupon.html',
        controller: 'grouponController'
    }).
    when('/school', {
        templateUrl: 'html/MainHtml/school.html',
        controller: 'schoolController'
    });

    // configure html5 to get links working on jsfiddle
    // $locationProvider.html5Mode(true);
    console.log("initialize route");
});

indexAPP.controller('indexController', function($scope, $resource, $routeParams, $location) {
	$scope.register_show = false;
	$scope.login_show = false;
	$scope.otherfuction_show = false;
	$scope.feedback_show = false;
	$scope.agree = true;
});

indexAPP.controller('mainController', function($scope, $resource, $routeParams, $location) {
    function getMerchantsLogo () {
        $resource("/merchant/logos").get({},function (res) {
            if (res.status===1) {
                console.info(res.data);
                $scope.merchants = res.data;
            } else{
                window.location = "/404";
            };
        });
    }
    getMerchantsLogo();
});

indexAPP.controller('activityController', function($scope, $resource, $routeParams, $location) {

});

indexAPP.controller('downloadController', function($scope, $resource, $routeParams, $location) {

});

indexAPP.controller('grouponController', function($scope, $resource, $routeParams, $location) {

});

indexAPP.controller('schoolController', function($scope, $resource, $routeParams, $location) {

});