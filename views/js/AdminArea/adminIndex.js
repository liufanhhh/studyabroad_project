var adminIndexApp = angular.module('adminIndexApp', ['ngResource', 'ngRoute','angularFileUpload','angular-md5']);

adminIndexApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: '../html/AdminArea/adminMain.html',
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
    when('/task/list', {
        templateUrl: '../html/AdminArea/taskList.html',
        controller: 'taskController'
    }).
    when('/task/create', {
        templateUrl: '../html/AdminArea/taskCreate.html',
        controller: 'taskCreateController'
    }).    
    when('/admin/profile', {
        templateUrl: '../html/AdminArea/adminProfile.html',
        controller: 'adminProfileController'
    });

    // configure html5 to get links working on jsfiddle
    // $locationProvider.html5Mode(true);
});

adminIndexApp.controller('adminIndexController', function($scope, $resource, $routeParams, $location, FileUploader, md5) {

	$scope.nav_child = {};

	$scope.getCurrentAdmin = function () {
		$resource("/admin/current/name").get({
		},function (res) {
			$scope.current_admin = res.data;
			if ($scope.current_admin == "liufan") {
				$scope.show_admin_control = true;
			};
		})
	};
	$scope.getCurrentAdmin();

	$scope.getAllAdmins = function  (deleted) {
		$resource("/admin/get/admin/list").get({
			deleted: deleted
		},function(res){
			$scope.all_admins = res.data;
		});
	};
	$scope.getAllAdmins(0);
	
	//密码加密
	$scope.signature = function (salt, value) {
		return md5.createHash(salt+"liufanhh"+md5.createHash(value));
	}

	$scope.navChildOptionsShow = function () {
		switch(arguments[0]){
			case "members": $scope.nav_child.members = true; break;
			case "merchants": $scope.nav_child.merchants = true; break;
			case "users": $scope.nav_child.users = true; break;
			case "transactions": $scope.nav_child.transactions = true; break;
			case "admin": $scope.nav_child.admin = true; break;
			case "tasks": $scope.nav_child.tasks = true; break;
		}
	};

	$scope.navChildOptionsHide = function () {
		$scope.nav_child = {};
	};

	$scope.websiteProfileReset = function () {
		$resource("/website/profile/create").get({
			website_name: "留学点评网",
			user_amount: 0,
			merchant_amount: 0
		},function (res) {
		})
	};
});


adminIndexApp.controller('mainController', function($scope, $resource, $routeParams, $location) {

});

adminIndexApp.controller('merchantAddController', function($scope, $resource, $routeParams, $location, md5) {
	$scope.merchant = {
		location_city: "Beijing",
		follow_up_admin: "Nobody"
	};
	$scope.getAllAdmins(0);
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

	$scope.merchantRegister = function () {
		$scope.merchant.create_time = new Date().getTime();
		$scope.merchant.password_sign = $scope.signature($scope.merchant.create_time, $scope.merchant.password);
		$scope.merchant.password = $scope.merchant.password_confirmation = null;
		$scope.merchant.banned = false;
		$resource("/merchant/profile/create").save({
			merchant: $scope.merchant
		},function(res){
			$scope.register_result = res.mess;
		})
	}
});

adminIndexApp.controller('adminProfileController', function($scope, $resource, $routeParams, $location) {

});
adminIndexApp.controller('adminListController', function($scope, $resource, $routeParams, $location) {
	$scope.getAllAdmins(0);
	$scope.admin_merchant_list = [];
	$scope.checkAdminMerchantList = function(admin_name) {
		$resource("/admin/response/merchants/name").get({
			admin_name: admin_name
		},function(res){
			if (res.status==0) {
				$scope.admin_merchant_list_message = res.mess;
			} else{
				if (res.data[0]!=null) {
					for(var i=0; i<res.data.length; i++){
						$scope.admin_merchant_list.push(res.data[i].task.merchant.name);
					};
					$scope.admin_merchant_list_show = true;
				} else{
					$scope.admin_merchant_list_show = false;
				};
			};
		})
	};

});

adminIndexApp.controller('taskController', function($scope, $resource, $routeParams, $location) {
	
	$scope.search_task = {};
	$scope.getAllTasks = function  (page) {
		$resource("/admin/all/task/list").get({
			page: page,
			page_show_amount: 10
		},function(res){
			if (res.status==0) {
				alert("数据库错误");
			} else{
				$scope.tasks = res.data;
			};
		});
	};
	$scope.getAllTasks(1);

	$scope.getAllAdmins = function  (deleted) {
		$resource("/admin/get/admin/list").get({
			deleted: deleted
		},function(res){
			$scope.all_admins = res.data;
			$scope.search_task_default = {
				assign_admin: [],
				create_admin: [],
				task_type: ["SignUpMerchant","AdminCreate","LiveApproval"],
				status: ["Initial","Processing","Finished"]
			};

			for (var i = $scope.all_admins.length - 1; i >= 0; i--) {
				$scope.search_task_default.assign_admin.push($scope.all_admins[i].admin.name);
				$scope.search_task_default.create_admin.push($scope.all_admins[i].admin.name);
			};

			$scope.search_task_default.assign_admin.push("Nobody");
			$scope.search_task_default.create_admin.push("System");
			
		});
	};
	$scope.getAllAdmins(1);

	$scope.findTask = function () {

		if ($scope.search_task.id!=null&&$scope.search_task.id!="") {
			console.log($scope.search_task.id);
			$resource("/admin/search/task/id").get({
				_id: $scope.search_task.id
			},function(res){
				if (res.status==0) {
					console.log("warning");
				} else if (res.status == 1){
					$scope.tasks = res.data;
				}
			});
		} else if($scope.search_task.merchant!=null&&$scope.search_task.merchant.id!=""){
			$resource("/admin/search/task/merchant/id").get({
				merchant_id: $scope.search_task.merchant.id
			},function(res){
				if (res.status==0) {
					console.log("warning");
				} else if (res.status == 1){
					$scope.tasks = res.data;
				}
			});
		} else{
			$scope.search_task_new = new Object();
			for (var key in $scope.search_task_default) {
				$scope.search_task_new[key] = $scope.search_task_default[key];
			};
			for ( var key in $scope.search_task) {
				if ($scope.search_task[key] != null && $scope.search_task[key] != "") {
					$scope.search_task_new[key] = [];
					$scope.search_task_new[key].push($scope.search_task[key]);
				};
			};
			$resource("/admin/search/task/all/conditions").get({
				task: $scope.search_task_new
			},function(res){
				if (res.status==0) {
					console.log("warning");
				} else if (res.status == 1){
					$scope.tasks = res.data;
				}
			});
		};
	};

});

adminIndexApp.controller('merchantListController', function($scope, $resource, $routeParams, $location) {

	$scope.location_city = "";
	$scope.banned = false;
	$scope.detail_checking = false;

	$scope.getAllMerchants = function  (page) {
		$resource("/admin/get/merchant/list").get({
			page: page,
			page_show_amount: 10
		},function(res){
			if (res.status==0) {
				alert("数据库错误");
			} else{
				$scope.merchants = res.data;
			};
		});
	};
	$scope.getAllMerchants(1);

	$scope.findMerchant = function () {
		for ( var key in $scope.merchant) {
			if ($scope.merchant[key] != null && $scope.merchant[key] != "") {
				$scope.detail_checking = true;
				$resource("/admin/search/merchant").get({
					key: key,
					value: $scope.merchant[key],
					banned: $scope.banned,
					location_city: $scope.location_city
				},function(res){
					if (res.status==0) {
						console.log("warning");
					} else if (res.status == 1){
							$scope.merchants = res.data;
					};
				});
				break;
			};
		};

		if (!$scope.detail_checking) {
			$resource("/admin/search/merchant").get({
				banned: $scope.banned,
				location_city: $scope.location_city
			},function(res){
				if (res.status==0) {
					console.log("warning");
				} else if (res.status == 1){
					if (typeof(res.data)=="array"||typeof(res.data)=="object") {
						$scope.merchants = res.data;
					} else{
						$scope.all_merchant_list_show = false;
						$scope.search_merchant_list_show = true;
						$scope.search_merchant = res.data.merchant;
					};

				};
			});
		};

	};

	$scope.$watch("merchant.name", function(newVal,oldVal,scope){
		if (newVal !== oldVal && newVal!=null){
			$resource("/merchant/name/complete").get({
				name: newVal
			},function(res){
			})
		};
	});
	
});


adminIndexApp.controller('adminManagementController', function($scope, $resource, $routeParams, $location, md5) {
	$scope.new_admin = {};
	$scope.admin_merchant_list = [];
	$scope.getAllAdmins(0);
	//获取此Admin负责的商户
	$scope.checkAdminMerchantList = function(admin_name) {
		$resource("/admin/response/merchants/name").get({
			admin_name: admin_name
		},function(res){
			if (res.status==0) {
				$scope.admin_merchant_list_message = res.mess;
			} else{
				if (res.data[0]!=null) {
					for(var i=0; i<res.data.length; i++){
						$scope.admin_merchant_list.push(res.data[i].task.merchant.name);
					};
					$scope.admin_merchant_list_show = true;
				} else{
					$scope.admin_merchant_list_show = false;
				};
			};
		})
	};
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

	$scope.deleteAdminProfile = function (name) {
		$scope.delete_admin_confirmation_show = true;
		$scope.delete_admin_name = name;
	};

	$scope.deleteAdminProfileConfirm = function(){
		$resource("/admin/delete").get({
			admin: $scope.delete_admin_name
		},function(res){
			if (res.status==1) {
				$scope.delete_admin_confirmation_show = false;
				$scope.delete_admin_name = null;
				$scope.getAllAdmins(0);
			} else{
				console.log(res.mess);
			};
		})
	};

	$scope.deleteAdminProfileCancel = function(){
		$scope.delete_admin_confirmation_show = false;
		$scope.delete_admin_name = null;
	};

	$scope.changeAdminProfile = function(admin_name){
		for (var i = $scope.all_admins.length - 1; i >= 0; i--) {
			console.log($scope.all_admins);
			if ($scope.all_admins[i].admin.name == admin_name) {
				$scope.admin_changing_profile = $scope.all_admins[i].admin;
				$scope.admin_changing_profile._id = $scope.all_admins[i]._id;
				$scope.admin_changing_profile.password_sign = $scope.admin_changing_profile.password;
				console.log($scope.admin_changing_profile.password_sign);
				$scope.admin_changing_profile.password = null;	
				break;
			} else{
			};
		 }; 
		$scope.admin_profile_change_show = true;
	}

	$scope.changeAdminProfileConfirm = function (argument) {
		if ($scope.admin_changing_profile.new_password != null) {
			$scope.admin_changing_profile.password_sign = $scope.signature(new Date($scope.admin_changing_profile.create_time).getTime(), $scope.admin_changing_profile.new_password);
		} else{

		};
		$resource("/admin/profile/change").save({
			admin: $scope.admin_changing_profile
		},function(res){
			$scope.admin_change_result = res.mess;
			$scope.admin_changing_profile.password = null;
		});
	}

});

adminIndexApp.controller('taskCreateController', function($scope, $resource, $routeParams, $location) {

	$scope.task = {
		assign_admin: "Nobody",
		note: [],
		create_admin: $scope.current_admin,
		task_type: "AdminCreate",
		status: "Initial",
		create_time: new Date()
	};

	$scope.taskCreate = function (argument) {
		$scope.task.note[0] = {
			create_admin: $scope.current_admin,
			content: $scope.task.content
		};
		$resource("/admin/task/create").save({
			task: $scope.task
		},function(res){
			if (res.status==0) {
				console.log("warning");
			} else if (res.status == 1){
				$scope.taskCreate_result = "创建成功";
			}
		});
	};

});
