var SignUpApp = angular.module('SignUpApp', ['ngResource', 'ngRoute']);

SignUpApp.controller('SignUpController',function($scope, $resource, $routeParams, $location){
	$scope.person = {};
	$scope.same_password = false;
	$scope.step_status = {
		first: false,
		second: false,
		third: false
	};
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
	//用户注册
	$scope.register = function(){
		$resource("/register").save({
			nickname: $scope.person.name,
			realname: $scope.person.realname,
			email:    $scope.person.email,
			password: $scope.person.password,
			userid:   $scope.person.userid,
			user_status: $scope.identification
		}, function(res) {
			console.log(res.mess);
		});
	};
	$scope.step1Control = function(){
		$resource("/user/name/checking").save({
			nickname: $scope.person.name,
		}, function(res) {
			if (res.status==0) {
				$scope.person.name = null;
				$scope.information.error = res.mess;
			} else{
				$resource("/user/email/checking").save({
					email: $scope.person.email
				}, function(res) {
					if (res.status==0) {
						$scope.person.email = null;
						$scope.information.error = res.mess;
					} else{
						$scope.step_status.first = true;				
					};
				});				
			};
		});
	};
	$scope.returnStep1 = function () {
		$scope.step_status.first = false;
	}
	$scope.step2Control = function(){
		$resource("http://qq.ip138.com/baidu-id/index.asp").save({
			userid:123456789012345678
		}, function(res) {
			console.log(res);
			$scope.step_status.second = true;
		});
	};
	// $scope.step1Control = function(){
	// 	$scope.step_status.first = true;
	// };

});