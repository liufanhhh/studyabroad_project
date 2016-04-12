var adminLoginApp = angular.module('adminLoginApp', ['ngResource', 'ngRoute', 'angular-md5']);

adminLoginApp.controller('adminLoginController',function($scope, $resource, $routeParams, $location, md5){
	$scope.admin = {};
	$scope.password_new = null;
	$scope.admin_page = false;
	$scope.fail_page = false;

	function show_prompt (){  
	    var company_password = prompt('company_password:', '');
	    console.log(company_password);  
	    if(company_password == null||company_password == ''){  
			$scope.admin_page = false;
			$scope.fail_page = true; 
	    }else{  
	    	company_password = md5.createHash(company_password);
	        $resource("/admin/password").save({
	        	company_password: company_password
	        }, function(res) {
				if (res.status==1) {
					$scope.admin_page = true;
					$scope.fail_page = false;
				} else{
					$scope.admin_page = false;
					$scope.fail_page = true; 
				};
	        }); 
	    }  
	}; 
	show_prompt();

	//密码加密
	$scope.signature = function (salt, value) {
		return md5.createHash(salt+"liufanhh"+md5.createHash(value));
	}

	$scope.login = function(){
		if ($scope.admin.name==null||$scope.admin.password==null) {
			$scope.admin.message = "邮箱或密码不能为空";
		} else{
			$scope.admin.message = null;
			$resource("/admin/profile/token").save({
				name: $scope.admin.name
			}, function(res) {
				if (res.status==0) {
					$scope.admin.message = res.mess;
				}
				else{
					$scope.admin.password_sign = $scope.signature(new Date(res.data).getTime(), $scope.admin.password);
					$scope.admin.password = null;
					$resource("/admin/login").save({
						name: $scope.admin.name,
						password: $scope.admin.password_sign
					}, function(res) {
						if (res.status==0) {
							$scope.admin.message = res.mess;
						} else{
							console.log(res.location);
							window.location = res.location;
						};
					});
				}
			});
		};
	}
});