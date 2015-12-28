var AdminLoginApp = angular.module('AdminLoginApp', ['ngResource', 'ngRoute']);

AdminLoginApp.controller('AdminLoginController',function($scope, $resource, $routeParams, $location){
	$scope.admin = {};
	$scope.password_new = null;
	$scope.admin_page = false;
	$scope.fail_page = false;

	$scope.show_prompt = function(){  
	    var company_password = prompt('company_password:', '');  
	    if(company_password == null||company_password == ''){  
			$scope.admin_page = false;
			$scope.fail_page = true; 
	    }else{  
	    	company_password = $scope.createHash(2, company_password, company_password, company_password);
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
	} 

	$scope.createHash = function (version, old_password, token1, token2) {
		var new_password;
		if (version == 1) {
			new_password = md5.createHash(md5.createHash(old_password+token1)+token2);
		} else if (version == 2){
			new_password = md5.createHash(md5.createHash(md5.createHash(old_password)+token1)+token2);
		};
		return new_password;
	}

	$scope.login = function(){
		$resource("/admin/profile/token").save({
			admin_name: $scope.admin.name,
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