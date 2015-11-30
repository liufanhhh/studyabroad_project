var MerchantProfileApp = angular.module('MerchantProfileApp', ['ngResource', 'ngRoute','angularFileUpload']);

MerchantProfileApp.controller('MerchantProfileController', function($scope, $resource, $routeParams, $location, FileUploader) {
	
	$scope.merchant = {
		logo: {
			name: "商户展示图片",
			uploading: false,
			completed: false,
			url: "/merchant/information/logo"
		},
		tax_registration: {
			name: "营业执照",
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
	};


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
	    console.info('onErrorItem', fileItem, response, status, headers);
	};

});
