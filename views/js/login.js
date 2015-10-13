var LoginAPP = angular.module('LoginAPP', ['ngResource', 'ngRoute']);

LoginAPP.controller('LoginController',function($scope, $resource, $routeParams, $location){
	$scope.person = {};
	$scope.password_new = null;

	//用户注册
	$scope.register = function(){
		$scope.person.password_new = md5($scope.person.password);
		console.log($scope.person.password_new);
		$resource("/login").save({
			nickname: $scope.person.name,
			password: $scope.person.password
		}, function(res) {
			console.log(res.mess);
		});
	};
});