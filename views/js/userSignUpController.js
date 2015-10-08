var SignUpApp = angular.module('SignUpApp', ['ngResource', 'ngRoute']);

SignUpApp.controller('SignUpController',function($scope){
	$scope.person = {};
	$scope.same_password=false;
	$scope.identification= "user";
	$scope.person.userid = "120xxxxxx123";
	$scope.person.realname = "刘凡"；
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
	//定义用户身份
	$scope.identify = function(identification){
		$scope.identification = identification;
	};
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

		});
	}

}