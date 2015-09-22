var IndexAPP = angular.module('IndexAPP', ['ngResource', 'ngRoute']);

/*
 * routes for saindex.html
 */
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
    //注册验证中的密码相同检验
    $scope.same_password=false;
    /*  监视密码2的输入，如果输入和密码1的相同，则可以注册。
    若不同，或者两个密码都为空，则不可注册。*/
//     $scope.$watch("password_cf", function(newVal,oldVal,scope){
//         if (newVal === oldVal){
//         }
//         else if(!$scope.password_cf){
//             $scope.same_password=false;
//         }
//         else if($scope.password !== $scope.password_cf){
//             $scope.same_password=false;
//         }
//         else if($scope.password === $scope.password_cf){
//             $scope.same_password=true;
//         }
//     });
// /*  按监视密码2的方法监视密码1*/
//     $scope.$watch("password", function(newVal,oldVal,scope){
//         if (newVal === oldVal){
//         }
//         else if(!$scope.password){
//             $scope.same_password=false;
//         }
//         else if($scope.password !== $scope.password_cf){
//             $scope.same_password=false;
//         }
//         else if($scope.password === $scope.password_cf){
//             $scope.same_password=true;
//         }
//     });

//     $scope.register = function() {
//         $resource("/register").get({
//             nickname: $scope.nickname,
//             email: $scope.email,
//             password: $scope.password
//         }, function(res) {
//                 $scope.reg_mess = res.mess;
//         });
//     }

});

IndexAPP.controller('MainController', function($scope, $resource, $routeParams, $location) {

});

IndexAPP.controller('ActivityController', function($scope, $resource, $routeParams, $location) {

});

IndexAPP.controller('DownloadController', function($scope, $resource, $routeParams, $location) {

});

IndexAPP.controller('GrouponController', function($scope, $resource, $routeParams, $location) {

});

IndexAPP.controller('SchoolController', function($scope, $resource, $routeParams, $location) {

});