var indexApp = angular.module('indexApp', ['ngResource', 'ngRoute']);

indexApp.controller('IndexCtrl', function($scope, $resource, $routeParams, $location) {