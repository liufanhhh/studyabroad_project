var SignUpApp = angular.module('SignUpApp', ['ngResource', 'ngRoute','angular-md5']);

SignUpApp.controller('SignUpController',function($scope, $resource, $routeParams, $location, md5){
	$scope.person = {};
	$scope.same_password = false;
	$scope.show_regulation = false;
	$scope.id_verification = false;
	/*监视密码2的输入，如果输入和密码1的相同，则可以注册。
	若不同，或者两个密码都为空，则不可注册。*/
	$scope.$watch("person.password_confirmation", function(newVal,oldVal,scope){
		if (newVal === oldVal){
		}
		else if(!$scope.person.password_confirmation){
			$scope.same_password=false;
		}
		else if($scope.person.password !== $scope.person.password_confirmation){
			$scope.same_password=false;
		}
		else if($scope.person.password === $scope.person.password_confirmation){
			$scope.same_password=true;
		}
	});
	/*按监视密码2的方法监视密码1*/
	$scope.$watch("person.password", function(newVal,oldVal,scope){
		if (newVal === oldVal){
		}
		else if(!$scope.person.password){
			$scope.same_password=false;
		}
		else if($scope.person.password !== $scope.person.password_confirmation){
			$scope.same_password=false;
		}
		else if($scope.person.password === $scope.person.password_confirmation){
			$scope.same_password=true;
		}
	});

	//身份证号验证算法
	$scope.$watch("person.userid", function(newVal,oldVal,scope){
		if (newVal === oldVal){
		}
		else if(!$scope.person.userid){
			$scope.useridValid=false;
		}
		else {

			$scope.useridValid=true;
		}
	});

	//密码加密
	$scope.signature = function (salt, value) {
		return md5.createHash(salt+"liufanhh"+md5.createHash(value));
	}


	//用户注册
	$scope.register = function(){
		$scope.person.create_time = new Date().getTime();
		console.log($scope.person.create_time);
		$scope.person.password_sign = $scope.signature($scope.person.create_time, $scope.person.password);
		$scope.person.password = $scope.person.password_confirmation = null;
		$resource("/user/register").save({
			user: $scope.person
		}, function(res) {
			if (res.status != 0) {
				console.log(res.location);
				window.location = res.location;
			};
			$scope.register_result = res.mess;
		});

	};
});