var MerchantProfileAdminApp = angular.module('MerchantProfileAdminApp', ['ngResource', 'ngRoute','angularFileUpload']);

MerchantProfileAdminApp.controller('MerchantProfileController', function($scope, $resource, $routeParams, $location, FileUploader) {
	$scope.website = {
		name: "liufan",
		user_amount: "",
		merchant_amount: ""
	};
	$scope.finded_merchant = {
		merchant_name: "",
		email: ""
	};
	$scope.website_name;
	$scope.create_status;
	$scope.user_amount;
	$scope.merchant_amount;
	$scope.change = 0;
	$scope.added_success = false;
	$scope.showProfile = false;
	$scope.new_merchant = false;
	$scope.find_merchant = false;
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
				uploading: false,
				completed: false,
				url: "/merchant/profile/logo"
			},
			business_license: {
				name: "营业执照",
				upload: false,
				completed: false,
				url: "/merchant/profile/business_license"
			},
			tax_registration: {
				name: "公司税号",
				upload: false,
				completed: false,
				url: "/merchant/profile/tax_registration"
			},
			organization_order: {
				name: "组织机构代码证",
				upload: false,
				completed: false,
				url: "/merchant/profile/organization_order"
			}
		}
	};

	$scope.addedNewWebsite = function(){
		console.log($scope.website_name);
		$resource("/website/profile/create").get({
			website_name: $scope.website_name,
			user_amount: $scope.user_amount,
			merchant_amount: $scope.merchant_amount
		},function (res) {
			console.log(res.mess);
		})
	}

	$scope.addedNewArea = function(){
		$scope.merchant.support_area[$scope.change] = "留学地区"+$scope.change;
		$scope.change++;
	};

	$scope.showAddArea = function(){
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
		if (item.url === "/merchant/profile/logo") {
			$scope.merchant.identification.logo.uploading = true;
		} else if(item.url === "/merchant/profile/tax_registration"){
			$scope.merchant.identification.tax_registration.uploading = true;
		} else {
			$scope.merchant.identification.organization_order.uploading = true;
		};
		item.formData[0] = {a:"abcd"};
	    console.info('onBeforeUploadItem', item);
	};
	uploader.onProgressItem = function(fileItem, progress) {

	    console.info('onProgressItem', fileItem, progress);
	};

	uploader.onErrorItem = function(fileItem, response, status, headers) {
		if (fileItem.url === "/merchant/profile/logo") {
			$scope.merchant.identification.logo.uploading = false;
		} else if(fileItem.url === "/merchant/profile/tax_registration"){
			$scope.merchant.identification.tax_registration.uploading = false;
		} else {
			$scope.merchant.identification.organization_order.uploading = false;
		};
	    console.info('onErrorItem', fileItem, response, status, headers);
	};

	uploader.SuccessItem = function(fileItem, response, status, headers) {
		if (fileItem.url === "/merchant/profile/logo") {
			$scope.merchant.identification.logo.completed = true;
		} else if(fileItem.url === "/merchant/profile/tax_registration"){
			$scope.merchant.identification.tax_registration.completed = true;
		} else {
			$scope.merchant.identification.organization_order.completed = true;
		};
	    console.info('onSuccessItem', fileItem, response, status, headers);
	};


});