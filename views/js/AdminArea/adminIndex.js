var AdminLoginApp = angular.module('AdminLoginApp', ['ngResource', 'ngRoute']);

AdminLoginApp.controller('AdminLoginController',function($scope, $resource, $routeParams, $location){

	$scope.createHash = function (version, old_password, token1, token2) {
		var new_password;
		if (version == 1) {
			new_password = md5.createHash(md5.createHash(old_password+token1)+token2);
		} else if (version == 2){
			new_password = md5.createHash(md5.createHash(md5.createHash(old_password)+token1)+token2);
		};
		return new_password;
	}

	//用户注册
	$scope.createNewUser = function(){
		$scope.merchant.password = md5.createHash($scope.merchant.password);
		$resource("/merchant/profile/create").save({
			merchant: $scope.merchant
		}, function(res) {
			if (res.status == 1) {
				$scope.merchant = res.data;
				$scope.merchant.password = $scope.createHash(1, $scope.merchant.password, $scope.merchant._id, $scope.merchant.create_time);
				$scope.merchant.password_confirmation = null;
				$resource("/merchant/profile/password").save({
					merchant_id: $scope.merchant.merchant_id,
					new_password: $scope.merchant.password
				}, function(res) {
					if (res.status == 1) {
						$scope.merchant = {};
						$scope.login_page = true;
						$scope.register_page = false;
					};
					$scope.register_result = res.mess;
				});
			};
			$scope.register_result = res.mess;
		});
	};
});