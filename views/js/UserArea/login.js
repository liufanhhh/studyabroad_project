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
			if (res.status==1) {
				$scope.person.password_sign = $scope.signature(new Date(res.data).getTime(), $scope.person.password);
				$scope.person.password = null;
				console.log($scope.person.password_sign);
				console.log(new Date(res.data).getTime());

				$resource("/user/login").save({
					user: $scope.person
				}, function(res) {
					if (res.status!= 0) {
						window.location = res.location;
					} else{
						$scope.login_result = res.mess;
					};
				});
			} else{
				$scope.login_result = res.mess;
			};
		});
	};
});