var adminIndexApp = angular.module('adminIndexApp', ['ngResource', 'ngRoute','angularFileUpload']);

adminIndexApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: '..html/AdminArea/main.html',
        controller: 'mainController'
    }).
    when('/merchant/add', {
        templateUrl: '../html/AdminArea/merchantAdd.html',
        controller: 'merchantAddController'
    }).
    when('/download', {
        templateUrl: 'html/MainHtml/download.html',
        controller: 'downloadController'
    }).
    when('/groupon', {
        templateUrl: 'html/MainHtml/groupon.html',
        controller: 'grouponController'
    }).
    when('/school', {
        templateUrl: 'html/MainHtml/school.html',
        controller: 'schoolController'
    });

    // configure html5 to get links working on jsfiddle
    // $locationProvider.html5Mode(true);
    console.log("initialize route");
});

adminIndexApp.controller('adminIndexController', function($scope, $resource, $routeParams, $location, FileUploader) {

	$scope.admin_name = "liufan";
	$scope.nav_child = {};


	$scope.navChildOptionsShow = function () {
		switch(arguments[0]){
			case "members": $scope.nav_child.members = true; break;
			case "merchants": $scope.nav_child.merchants = true; break;
			case "users": $scope.nav_child.users = true; break;
			case "transactions": $scope.nav_child.transactions = true; break;
			case "admin": $scope.nav_child.admin = true; break;
		}
	}

	$scope.navChildOptionsHide = function () {
		$scope.nav_child = {};
	}



	$scope.create_status;
	$scope.logos;
	$scope.change = 0;
	$scope.added_success = false;
	$scope.showProfile = false;
	$scope.new_merchant = false;
	$scope.find_merchant = false;
	$scope.finded_merchant = {
		merchant_name: "",
		email: ""
	};




	$scope.addedNewWebsite = function(){
		$resource("/website/profile/create").get({
			website_name: "留学点评网",
			user_amount: 0,
			merchant_amount: 0
		},function (res) {
			console.log(res.mess);
		})
	}

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

	$scope.addNewMerchant = function(){
		$resource("/merchant/profile/create").save({
			merchant: {
				name: 	$scope.merchant.name,
				email: 	$scope.merchant.email,
				contact_person: 	$scope.merchant.contact_person,
				mobile: 	$scope.merchant.mobile,
				website: 	$scope.merchant.website,
				location: 	$scope.merchant.location,
				support_area: 	$scope.merchant.support_area,
				pass_rate: 	$scope.merchant.score.pass_rate,
				article_score: 	$scope.merchant.score.article_score,
				total_score: $scope.merchant.score.total_score
			}
		}, function(res) {
			console.log(res.mess);
			$scope.create_status = "创建成功";
			$scope.new_merchant = false;
			$scope.find_merchant = true;
		});
	};		

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

adminIndexApp.controller('merchantAddController', function($scope, $resource, $routeParams, $location) {
	$scope.admins = [
		"liufan",
		"fanliu"
	]
	$scope.merchant = {
		id: "",
		name: "",
		email: "",
		contact_person: "",
		mobile: "",
		website: "",
		location: "",
		support_area: [],
		score:{ 
		    pass_rate: '',
		    article_score: '',
		    total_score: ''
		},
		identification: {
			logo: {
				name: "商户展示图片",
				completed: false,
				url: "/merchant/profile/logo"
			},
			business_license: {
				name: "营业执照",
				completed: false,
				url: "/merchant/profile/business_license"
			},
			tax_registration: {
				name: "公司税号",
				completed: false,
				url: "/merchant/profile/tax_registration"
			},
			organization_order: {
				name: "组织机构代码证",
				completed: false,
				url: "/merchant/profile/organization_order"
			}
		}
	};

});

adminIndexApp.controller('activityController', function($scope, $resource, $routeParams, $location) {

});
