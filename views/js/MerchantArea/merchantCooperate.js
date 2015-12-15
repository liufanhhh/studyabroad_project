var merchantCooperateApp = angular.module('merchantCooperateApp', ['ngResource', 'ngRoute', 'angular-md5']);

merchantCooperateApp.controller('merchantCooperateController',function($scope, $resource, $routeParams, $location, md5){
	$scope.merchant = {};
	$scope.same_password = false;
	$scope.login_page = true;
	$scope.register_page = false;
	$scope.register_result = "";

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

	//用户注册
	$scope.register = function(){
		$resource("/merchant/profile/create").save({
			merchant: $scope.merchant
		}, function(res) {
			$scope.register_result = res.mess;
			if (res.status == 1) {
				$scope.login_page = true;
				$scope.register_page = false;
			};
		});
	};

	$scope.login = function(){
		$resource("/merchant/login").save({
			merchant: $scope.merchant
		}, function(res) {
			console.log(res.mess);
		});
	};
	
});