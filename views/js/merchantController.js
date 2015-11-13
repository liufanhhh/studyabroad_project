var MerchantApp = angular.module('MerchantApp', ['ngResource', 'ngRoute','angularFileUpload']);

MerchantApp.controller('MerchantProfileController', function($scope, $resource, $routeParams, $location ,FileUploader) {
	//file upload
	var uploader = $scope.uploader = new FileUploader({
	    url: '/aa',
	});

	$scope.test_url = "aaa";
	// FILTERS

	uploader.filters.push({
	    name: 'customFilter',
	    fn: function(item /*{File|FileLikeObject}*/, options) {
	    	var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
	    	return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
	    }
	});
	$scope.show = function(){
		$scope.test_url = 'bbb';
	}
	// CALLBACKS

	uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
	    console.info('onWhenAddingFileFailed', item, filter, options);
	};
	uploader.onAfterAddingFile = function(fileItem) {
	    fileItem.url = '/'+$scope.test_url;
	    fileItem.upload();
	};
	uploader.onAfterAddingAll = function(addedFileItems) {
	    console.info('onAfterAddingAll', addedFileItems);
	};
	uploader.onBeforeUploadItem = function(item) {
	    console.info('onBeforeUploadItem', item);
	};
	uploader.onProgressItem = function(fileItem, progress) {
	    $scope.fileUp_load_Progress = progress;
	};
	uploader.onProgressAll = function(progress) {
	    console.info('onProgressAll', progress);
	};
	uploader.onSuccessItem = function(fileItem, response, status, headers) {
	    console.info('onSuccessItem', fileItem, response, status, headers);
	};
	uploader.onErrorItem = function(fileItem, response, status, headers) {
	    console.info('onErrorItem', fileItem, response, status, headers);
	};
	uploader.onCancelItem = function(fileItem, response, status, headers) {
	    console.info('onCancelItem', fileItem, response, status, headers);
	};
	uploader.onCompleteItem = function(fileItem, response, status, headers) {
		$scope.upload_result = response.mess;
	};
	uploader.onCompleteAll = function() {
	    console.info('onCompleteAll');
	    console.info('profile',$scope.profile);
	};

	console.info('uploader', uploader);


	// -------------------------------
});
