var merchantLoginApp = angular.module('merchantLoginApp', ['ngResource', 'ngRoute', 'angular-md5']);

merchantLoginApp.controller('merchantLoginController',function($scope, $resource, $routeParams, $location, md5){
	$scope.merchant = {};
	$scope.login = {};
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
		$scope.merchant.willing_to_cooperate = true;
		$scope.merchant.hierarchy = 2;
		$scope.merchant.follow_up_admin = "nobody";
		$scope.merchant.banned = false;
		$resource("/merchant/profile/create").save({
			merchant: $scope.merchant
		},function(res){
			$scope.register_result = res.mess;
		})
	}

	$scope.login = function(){
		if ($scope.login.email==null||$scope.login.password==null) {
			$scope.login.message = "邮箱或密码不能为空";
		} else{
			$scope.login.message = null;
			$resource("/merchant/profile/token").save({
				email: $scope.login.email
			}, function(res) {
				if (res.status==0) {
					$scope.login.message = res.mess;
				}
				else{
					console.log(res.data);
					$scope.login.password_sign = $scope.signature(new Date(res.data).getTime(), $scope.login.password);
					$scope.login.password = null;
					console.log($scope.login.password_sign);
					$resource("/merchant/login").save({
						email: $scope.login.email,
						password: $scope.login.password_sign
					}, function(res) {
						if (res.status==0) {
							$scope.login.message = res.mess;
						} else{
							console.log(res.location);
							window.location = res.location;
						};
					});
				}
			});
		};


	};
	
});