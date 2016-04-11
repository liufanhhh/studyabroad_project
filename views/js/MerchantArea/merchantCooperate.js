var merchantCooperateApp = angular.module('merchantCooperateApp', ['ngResource', 'ngRoute', 'angular-md5', 'liufanhh']);

merchantCooperateApp.controller('merchantCooperateController',function($scope, $resource, $routeParams, $location, md5){
	$scope.merchant = {};
	$scope.register_step=1;
	$scope.same_password = false;
	$scope.login_page = true;
	$scope.register_page = false;
	
	$scope.$watch("merchant.password_confirmation", function(newVal,oldVal,scope){
		if (newVal === oldVal){
		}
		else if(!$scope.merchant.password_confirmation){
			$scope.same_password = false;
		}
		else if($scope.merchant.password !== $scope.merchant.password_confirmation){
			$scope.same_password = false;
		}
		else if($scope.merchant.password === $scope.merchant.password_confirmation){
			$scope.same_password = true;
		}
	});
	/*按监视密码2的方法监视密码1*/
	$scope.$watch("merchant.password", function(newVal,oldVal,scope){
		if (newVal === oldVal){
		}
		else if(!$scope.merchant.password){
			$scope.same_password=false;
		}
		else if($scope.merchant.password !== $scope.merchant.password_confirmation){
			$scope.same_password=false;
		}
		else if($scope.merchant.password === $scope.merchant.password_confirmation){
			$scope.same_password=true;
		}
	});

	$scope.registerPage = function(){
		$scope.login_page = false;
		$scope.register_page = true;
	};

	$scope.loginPage = function(){
		$scope.login_page = true;
		$scope.register_page = false;
	};

	//密码加密
	$scope.signature = function (salt, value) {
		return md5.createHash(salt+"liufanhh"+md5.createHash(value));
	}

	$scope.merchantRegister = function () {
		$scope.merchant.create_time = new Date().getTime();
		$scope.merchant.password_sign = $scope.signature($scope.merchant.create_time, $scope.merchant.password);
		$scope.merchant.password = $scope.merchant.password_confirmation = null;
		$resource("/merchant/profile/create").save({
			merchant: $scope.merchant
		},function(res){
			$scope.register_result = res.mess;
		})
	}

	$scope.login = function(){
		$resource("/merchant/profile/token").save({
			email: $scope.merchant.email
		}, function(res) {
			$scope.merchant.password = $scope.createHash(2, $scope.merchant.password, token1, token2);
			$resource("/merchant/login").save({
				email: $scope.merchant.email,
				password: $scope.merchant.password
			}, function(res) {
				console.log(res.location);
				window.location = res.location;
			});
		});
	};
	
});