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

	$scope.login = function(){
		$resource("/admin/profile/token").save({
			admin_name: $scope.admin.name
		}, function(res) {
			var token1 = res.data.token1;
			var token2 = res.data.token2;
			console.log(token1);
			console.log(token2);
			$scope.admin.password = $scope.createHash(2, $scope.admin.password, token1, token2);
			$resource("/admin/login").save({
				admin_name: $scope.admin.name,
				admin_password: $scope.admin.password
			}, function(res) {
				console.log(res.location);
				window.location = res.location;
			});
		});
	};
});