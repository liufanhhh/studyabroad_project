var adminIndexApp = angular.module('adminIndexApp', ['ngResource', 'ngRoute','angularFileUpload','angular-md5']);

adminIndexApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: '../html/AdminArea/main.html',
        controller: 'mainController'
    }).
    when('/admin/members/management', {
        templateUrl: '../html/AdminArea/adminManagement.html',
        controller: 'adminManagementController'
    }).
    when('/admin/members/list', {
        templateUrl: '../html/AdminArea/adminList.html',
        controller: 'adminListController'
    }).
    when('/merchant/add', {
        templateUrl: '../html/AdminArea/merchantAdd.html',
        controller: 'merchantAddController'
    }).
    when('/merchant/list', {
        templateUrl: '../html/AdminArea/merchantList.html',
        controller: 'merchantListController'
    }).
    when('/admin/task/list', {
        templateUrl: '../html/AdminArea/task.html',
        controller: 'taskController'
    }).
    when('/admin', {
        templateUrl: '../html/MainHtml/school.html',
        controller: 'schoolController'
    });

    // configure html5 to get links working on jsfiddle
    // $locationProvider.html5Mode(true);
    console.log("initialize route");
});

adminIndexApp.controller('adminIndexController', function($scope, $resource, $routeParams, $location, FileUploader, md5) {

	$scope.nav_child = {};

	$scope.getCurrentAdmin = function () {
		$resource("/admin/current/name").get({
		},function (res) {
			$scope.current_admin = res.data;
			if ($scope.current_admin == "liufan") {
				$scope.show_admin_control = true;
				console.log($scope.show_admin_control);
			};
		})
	}
	$scope.getCurrentAdmin();


	$scope.navChildOptionsShow = function () {
		switch(arguments[0]){
			case "members": $scope.nav_child.members = true; break;
			case "merchants": $scope.nav_child.merchants = true; break;
			case "users": $scope.nav_child.users = true; break;
			case "transactions": $scope.nav_child.transactions = true; break;
			case "admin": $scope.nav_child.admin = true; break;
			case "tasks": $scope.nav_child.tasks = true; break;
		}
	}

	$scope.navChildOptionsHide = function () {
		$scope.nav_child = {};
	}

	$scope.websiteProfileReset = function () {
		$resource("/website/profile/create").get({
			website_name: "留学点评网",
			user_amount: 0,
			merchant_amount: 0
		},function (res) {
			console.log(res.mess);
		})
	}

	$scope.getAllAdmins = function  (argument) {
		$resource("/admin/get/all").get({

		},function(res){
			$scope.all_admins = res.data;
			console.log($scope.all_admins);
		});
	}

	$scope.getAllAdmins();

	function getMerchantsLogo () {
		$resource("/merchant/logos").get({},function (res) {
			console.log("aa");
			if (res.status===1) {
				$scope.logos = res.data;
				console.info(res.data);
			} else{
				console.log(res.mess);
				console.info(res.data);
			};
		});
	}

	getMerchantsLogo();

	$scope.addedNewArea = function(){
		$scope.merchant.support_area[$scope.change] = "留学地区"+$scope.change;
		$scope.change++;
	};

	$scope.showAddMerchantArea = function(){
		$scope.new_merchant = true;
		$scope.find_merchant = false;
	}

	$scope.showFindArea = function(){
		$scope.new_merchant = false;
		$scope.find_merchant = true;
	}

	

	$scope.findMerchant = function(){
		$resource("/merchant/profile/find").get({
			merchant_name: 	$scope.finded_merchant.merchant_name,
			merchant_email: $scope.finded_merchant.email
		}, function(res) {
			console.info(res);
			if (res.mess = "success") {
				$scope.showProfile = true;
				$scope.finded_merchant = res.data;
			} else{
				cosole.log(res.mess);
			};
		});		
	}

	var uploader = $scope.uploader = new FileUploader({removeAfterUpload: true,autoUpload: true});

	uploader.onBeforeUploadItem = function(item) {
		var filename = item.file.type;
		var filename = filename.substring(filename.indexOf("\/"),filename.length);
		var filename = filename.replace(/\//,"\.");
		if (item.url === "/merchant/profile/logo") {
			filename = "logo"+filename;
		} else if(item.url === "/merchant/profile/tax_registration"){
			filename = "tax_registration"+filename;
		} else {
			filename = "organization_order"+filename;
		};
		item.formData[0] = {file_name: filename};
		item.formData[1] = {merchant_id: $scope.finded_merchant.merchant_id};
	    console.info('onBeforeUploadItem', item);
	};

	uploader.onProgressItem = function(fileItem, progress) {
	    console.info('onProgressItem', fileItem, progress);
	};

	uploader.onErrorItem = function(fileItem, response, status, headers) {
	    console.info('onErrorItem', fileItem, response, status, headers);
	};

	uploader.SuccessItem = function(fileItem, response, status, headers) {
	    console.info('onSuccessItem', fileItem, response, status, headers);
	};

});


adminIndexApp.controller('mainController', function($scope, $resource, $routeParams, $location) {
    function getMerchantsLogo () {
        $resource("/merchant/logos").get({},function (res) {
            if (res.status===1) {
                console.info(res.data);
                $scope.merchants = res.data;
            } else{
                window.location = "/404";
            };
        });
    }
    getMerchantsLogo();
});

adminIndexApp.controller('merchantAddController', function($scope, $resource, $routeParams, $location, md5) {

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

	//密码加密
	$scope.signature = function (salt, value) {
		return md5.createHash(salt+"liufanhh"+md5.createHash(value));
	}

	$scope.merchantRegister = function () {
		$scope.merchant.create_time = new Date().getTime();
		$scope.merchant.password_sign = $scope.signature($scope.merchant.create_time, $scope.merchant.password);
		$scope.merchant.password = $scope.merchant.password_confirmation = null;
		if ($scope.merchant.follow_up_admin == null) {
			$scope.merchant.follow_up_admin = "nobody";
		};
		console.log($scope.merchant.follow_up_admin == null);
		console.log($scope.merchant.follow_up_admin);
		$scope.merchant.banned = false;
		$resource("/merchant/profile/create").save({
			merchant: $scope.merchant
		},function(res){
			$scope.register_result = res.mess;
		})
	}
});

adminIndexApp.controller('activityController', function($scope, $resource, $routeParams, $location) {

});
adminIndexApp.controller('adminListController', function($scope, $resource, $routeParams, $location) {
	$scope.admin_merchant_list = [];
	$scope.checkAdminMerchantList = function(admin_name) {
		$resource("/admin/response/merchants/name").get({
			admin_name: admin_name
		},function(res){
			if (res.status==0) {
				$scope.admin_merchant_list_message = res.mess;
			} else{
				for(var i=0; i<res.data.length; i++){
					$scope.admin_merchant_list.push(res.data[i].task.merchant.name);
				};
				$scope.admin_merchant_list_show = true;
			};
		})
	}

});

adminIndexApp.controller('taskController', function($scope, $resource, $routeParams, $location) {

});

adminIndexApp.controller('merchantListController', function($scope, $resource, $routeParams, $location) {
	$scope.$watch("merchant.name", function(newVal,oldVal,scope){
		if (newVal !== oldVal && newVal!=null){
			$resource("/merchant/name/complete").get({
				name: newVal
			},function(res){
				console.log(res.mess);
				console.log(res.data);
			})
		}
	});
	
});


adminIndexApp.controller('adminManagementController', function($scope, $resource, $routeParams, $location, md5) {
	$scope.new_admin = {};
	/*监视密码2的输入，如果输入和密码1的相同，则可以注册。
	若不同，或者两个密码都为空，则不可注册。*/
	$scope.$watch("new_admin.password_confirmation", function(newVal,oldVal,scope){
		if (newVal === oldVal){
		}
		else if(!$scope.new_admin.password_confirmation){
			$scope.same_password=false;
		}
		else if($scope.new_admin.password !== $scope.new_admin.password_confirmation){
			$scope.same_password=false;
		}
		else if($scope.new_admin.password === $scope.new_admin.password_confirmation){
			$scope.same_password=true;
		}
	});
	/*按监视密码2的方法监视密码1*/
	$scope.$watch("new_admin.password", function(newVal,oldVal,scope){
		if (newVal === oldVal){
		}
		else if(!$scope.new_admin.password){
			$scope.same_password=false;
		}
		else if($scope.new_admin.password !== $scope.new_admin.password_confirmation){
			$scope.same_password=false;
		}
		else if($scope.new_admin.password === $scope.new_admin.password_confirmation){
			$scope.same_password=true;
		}
	});

	//密码加密
	$scope.signature = function (salt, value) {
		return md5.createHash(salt+"liufanhh"+md5.createHash(value));
	}

	$scope.addNewAdmin = function () {
		$scope.new_admin.create_time = new Date().getTime();
		$scope.new_admin.password_sign = $scope.signature($scope.new_admin.create_time, $scope.new_admin.password);
		$scope.new_admin.password = $scope.new_admin.password_confirmation = null;
		$resource("/admin/create").save({
			admin: $scope.new_admin
		},function(res){
			$scope.register_result = res.mess;
		})
	}



	$scope.responseMerchantShow = function(){
		console.log(arguments[0]);
	}

});