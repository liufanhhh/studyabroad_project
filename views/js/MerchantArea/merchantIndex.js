var merchantIndexApp = angular.module('merchantIndexApp', ['ngResource', 'ngRoute','angularFileUpload','angular-md5','ngImgCrop']);

/*
 * routes for saindex.html
 */
merchantIndexApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: '/html/MerchantArea/merchantProfile.html',
        controller: 'profileController'
    }).
    when('/product', {
    	templateUrl: '/html/MerchantArea/merchantproduct.html',
    	controller: 'productController'
    }).
    when('/comment', {
    	templateUrl: '/html/MerchantArea/merchantComment.html',
    	controller: 'commentController'
    }).
    when('/order', {
    	templateUrl: '/html/MerchantArea/merchantOrder.html',
    	controller: 'orderController'
    });

});

merchantIndexApp.controller('indexController',function($scope, $resource, $routeParams, $location){
	$scope.current_merchant = null;
	$resource("/merchant/current/merchant").get({},function (res) {
	    if (res.status==1) {
	        $scope.current_merchant = res.data.merchant;
	        console.log( $scope.current_merchant);
	        if ( $scope.current_merchant.logo == null) {
	        	$scope.current_merchant.logo = "/storage/public/logo.jpg";
	        };
	    };
	});
});

merchantIndexApp.controller('profileController', function($scope, $resource, $routeParams, $location, FileUploader, md5) {

	$scope.myImage='';
	$scope.myCroppedImage='';
	var uploader = $scope.uploader = new FileUploader({url:"/merchant/logo/upload", removeAfterUpload: true});

	/**
	 * Show preview with cropping
	 */
	 uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
	     console.info('onWhenAddingFileFailed', item, filter, options);
	 };
	uploader.onAfterAddingFile = function(item) {
		console.info('onAfterAddingFile', item);
	  var reader = new FileReader();
	  reader.onload = function(event) {
	    $scope.$apply(function(){
	      $scope.myImage = event.target.result;
	    });
	  };

	  reader.readAsDataURL(item._file);
	};

	/**
	 * Upload Blob (cropped image) instead of file.
	 * @see
	 *   https://developer.mozilla.org/en-US/docs/Web/API/FormData
	 *   https://github.com/nervgh/angular-file-upload/issues/208
	 */
	uploader.onBeforeUploadItem = function(item) {
	  var blob = dataURItoBlob($scope.myCroppedImage);
	  item._file = blob;
	  var filename = item.file.type;
	  filename = filename.substring(filename.indexOf("\/"),filename.length);
	  filename = filename.replace(/\//,"\.");
	  filename = $scope.current_admin+filename;

	  item.formData[0] = {admin: $scope.current_admin};
	  item.formData[1] = {filename: filename};
	};

	/**
	 * Converts data uri to Blob. Necessary for uploading.
	 * @see
	 *   http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
	 * @param  {String} dataURI
	 * @return {Blob}
	 */
	var dataURItoBlob = function(dataURI) {
	  var binary = atob(dataURI.split(',')[1]);
	  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
	  var array = [];
	  for(var i = 0; i < binary.length; i++) {
	    array.push(binary.charCodeAt(i));
	  }
	  return new Blob([new Uint8Array(array)], {type: mimeString});
	};

	uploader.onProgressItem = function(fileItem, progress) {
	    console.info('onProgressItem', fileItem, progress);
	};

	uploader.onErrorItem = function(fileItem, response, status, headers) {
	    console.info('onErrorItem', fileItem, response, status, headers);
	};

	uploader.SuccessItem = function(fileItem, response, status, headers) {
		$scope.getCurrentAdminAvatar();
	    console.info('onSuccessItem', fileItem, response, status, headers);
	};

	$scope.uploadAdminAvatar = function(){
		uploader.uploadAll();
	};
	
});

merchantIndexApp.controller('productController',function($scope, $resource, $routeParams, $location){

	
});

merchantIndexApp.controller('commentController',function($scope, $resource, $routeParams, $location){

	
});

merchantIndexApp.controller('orderController',function($scope, $resource, $routeParams, $location){

	
});