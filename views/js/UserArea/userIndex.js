var userIndexApp = angular.module('userIndexApp', ['ngResource', 'ngRoute','angular-md5']);

/*
 * routes for saindex.html
 */
userIndexApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: '/html/UserArea/profile.html',
        controller: 'profileController'
    }).
    when('/pravicy', {
        templateUrl: '/html/UserArea/pravicy.html',
        controller: 'pravicyController'
    }).
    when('/history', {
        templateUrl: '/html/UserArea/history.html',
        controller: 'historyController'
    }).
    when('/favorite', {
        templateUrl: '/html/UserArea/favorite.html',
        controller: 'favoriteController'
    }).
    when('/password', {
        templateUrl: '/html/UserArea/password.html',
        controller: 'passwordController'
    }).
    when('/mobile', {
        templateUrl: '/html/UserArea/mobile.html',
        controller: 'mobileController'
    });
});

userIndexApp.controller('indexController',function($scope, $resource, $routeParams, $location, md5){

});

userIndexApp.controller('profileController',function($scope, $resource, $routeParams, $location, md5){

});

userIndexApp.controller('pravicyController',function($scope, $resource, $routeParams, $location, md5){

});

userIndexApp.controller('historyController',function($scope, $resource, $routeParams, $location, md5){

});

userIndexApp.controller('favoriteController',function($scope, $resource, $routeParams, $location, md5){

});

userIndexApp.controller('passwordController',function($scope, $resource, $routeParams, $location, md5){

});

userIndexApp.controller('mobileController',function($scope, $resource, $routeParams, $location, md5){

});