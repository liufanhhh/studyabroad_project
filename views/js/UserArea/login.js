var LoginApp = angular.module('LoginApp', ['ngResource', 'ngRoute','angular-md5']);

LoginApp.controller('LoginController',function($scope, $resource, $routeParams, $location, md5){
	$scope.login = function(){
		$resource("/user/profile/token").save({
			email: $scope.person.email
		}, function(res) {
			var token = res.data;
			$scope.person.password_sign = signature(token, $scope.person.password);
			var salt = $scope.person.salt = new Date();
			$scope.person.signature = signature(salt, $scope.person.password);
			$resource("/user/login").save({
				user: $scope.person
			}, function(res) {
				if (res.status==1) {
					window.location = res.location;
				} else{
					$scope.login_result = res.mess;
				};
			});
		});
	};
});