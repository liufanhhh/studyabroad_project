var SignUpAPP = angular.module('SignUpAPP', ['ngResource', 'ngRoute']);

SignUpAPP.controller('SignUpController',function($scope, $resource, $routeParams, $location){
	$scope.person = {};
	$scope.same_password = false;
	$scope.identification = "user";
	$scope.register_url = "/register/user"
	$scope.register_result;

	$scope.user_email = "";



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

	//根据邮箱找用户

	//根据用户名找用户


	//用户注册
	$scope.register = function(){
		
		if ($scope.identification !== "user") {
			$scope.register_url = "/register/merchant";
		};

		$resource($scope.register_url).save({
			nickname: $scope.person.name,
			realname: $scope.person.realname,
			email:    $scope.person.email,
			password: $scope.person.password,
			id_number:   $scope.person.id_number,
		}, function(res) {
			$scope.register_result = res.data;
			console.log(res.data);
		});
	};
});