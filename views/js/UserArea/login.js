var LoginApp = angular.module('LoginApp', ['ngResource', 'ngRoute','angular-md5']);

LoginApp.controller('LoginController',function($scope, $resource, $routeParams, $location, md5){
	$scope.person = {};

	//密码加密
	$scope.signature = function (salt, value) {
		return md5.createHash(salt+"liufanhh"+md5.createHash(value));
	}

	$scope.login = function(){
		console.log($scope.person.keep_cookie);
		$resource("/user/profile/token").save({
			name_email: $scope.person.name_email
		}, function(res) {
			var token = res.data;
			$scope.person.password_sign = $scope.signature(token, $scope.person.password);
			var salt = $scope.person.salt = new Date().getTime();
			$scope.person.signature = $scope.signature(salt, $scope.person.password_sign);
			$scope.person.password = null;
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