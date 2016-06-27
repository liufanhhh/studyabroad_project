var indexApp = angular.module('indexApp', ['ngResource', 'ngRoute']);

/*
 * routes for saindex.html
 */
indexApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'html/MainHtml/main.html',
        controller: 'mainController'
    }).
    when('/groupon', {
        templateUrl: 'html/MainHtml/groupon.html',
        controller: 'grouponController'
    }).
    when('/school', {
        templateUrl: 'html/MainHtml/school.html',
        controller: 'schoolController'
    }).
    when('/lesson', {
        templateUrl: 'html/MainHtml/lesson.html',
        controller: 'lessonController'
    }).
    when('/messagebox', {
        templateUrl: 'html/MainHtml/messagebox.html',
        controller: 'messageboxController'
    }).
    when('/paperwork', {
        templateUrl: 'html/MainHtml/paperwork.html',
        controller: 'paperworkController'
    });
});

indexApp.controller('indexController', function($scope, $resource, $routeParams, $location) {
    $scope.current_user = null;
    $resource("/user/current/user").get({},function (res) {
        if (res.status==1) {
            console.info(res.data);
            $scope.current_user = res.data;
        };
    });
});

indexApp.controller('mainController', function($scope, $resource, $routeParams, $location) {
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

indexApp.controller('lessonController', function($scope, $resource, $routeParams, $location) {

});

indexApp.controller('paperworkController', function($scope, $resource, $routeParams, $location) {

});

indexApp.controller('grouponController', function($scope, $resource, $routeParams, $location) {

});

indexApp.controller('schoolController', function($scope, $resource, $routeParams, $location) {

});