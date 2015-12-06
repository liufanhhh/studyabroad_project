var MerchantProfileApp = angular.module('MerchantProfileApp', ['ngResource', 'ngRoute','angularFileUpload']);

MerchantProfileApp.controller('MerchantProfileController', function($scope, $resource, $routeParams, $location, FileUploader) {
	$scope.change = 0;
	$scope.added_success = false;
	$scope.showProfile = false;
	$scope.merchant = {
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
				url: "/merchant/information/logo"
			},
			business_license: {
				name: "营业执照",
				upload: false,
				completed: false,
				url: "/merchant/information/business_license"
			},
			tax_registration: {
				name: "公司税号",
				upload: false,
				completed: false,
				url: "/merchant/information/tax_registration"
			},
			organization_order: {
				name: "组织机构代码证",
				upload: false,
				completed: false,
				url: "/merchant/information/organization_order"
			}
		}
	};


	$scope.addedNewArea = function(){
		$scope.merchant.support_area[$scope.change] = "留学地区"+$scope.change;
		$scope.change++;
	};

	$scope.addNewMerchant = function(){
		$resource("/merchant/profile/create").save({
			merchant{
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
		});
	};		

	$scope.findMerchant = function(){
		$resource("/merchant/profile/find").get({
			merchant{
				name: 	$scope.merchant.name,
				email: 	$scope.merchant.email,
			}
		}, function(res) {
			$scope.merchant = res.data;
		});		
	}



	var uploader = $scope.uploader = new FileUploader({removeAfterUpload: true,autoUpload: true});

	uploader.onProgressItem = function(fileItem, progress) {
		if (fileItem.url === "/merchant/information/logo") {
			logo.uploading = true;
			fileItem.formData[0] = 'logo';
		} else if(fileItem.url === "/merchant/information/tax_registration"){
			tax_registration.uploading = true;
			fileItem.formData[0] = 'tax_registration';
		} else {
			organization_order.uploading = true;
			fileItem.formData[0] = 'organization_order';
		};
	    console.info('onProgressItem', fileItem, progress);
	};

	uploader.onErrorItem = function(fileItem, response, status, headers) {
		if (fileItem.url === "/merchant/information/logo") {
			logo.uploading = false;
		} else if(fileItem.url === "/merchant/information/tax_registration"){
			tax_registration.uploading = false;
		} else {
			organization_order.uploading = false;
		};
	    console.info('onErrorItem', fileItem, response, status, headers);
	};

	uploader.SuccessItem = function(fileItem, response, status, headers) {
		if (fileItem.url === "/merchant/information/logo") {
			logo.completed = true;
		} else if(fileItem.url === "/merchant/information/tax_registration"){
			tax_registration.completed = true;
		} else {
			organization_order.completed = true;
		};
	    console.info('onSuccessItem', fileItem, response, status, headers);
	};


});
