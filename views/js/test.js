var indexApp = angular.module('indexApp', ['ngResource', 'ngRoute', 'btford.socket-io'])
.factory('mySocket', function (socketFactory) {
   return socketFactory();
});

indexApp.controller('indexController', function($scope, mySocket) {
	$scope.step1 = true;
	$scope.step2 = false;
	$scope.sending_messages = [];
	$scope.received_messages = [];

	$scope.confirmName = function(){
		mySocket.emit('client name', { user_nickname:$scope.user_name});
	};


	mySocket.on('name change result', function (result) {
	    if (result) {
	    	$scope.step1 = false;
	    	$scope.step2 = true;
	    } else{
	    	$scope.user_name = "昵称设置未成功，请重新设置";
	    };
	});

	mySocket.on('message sending result', function (result) {
		for (var i = 0; i < $scope.sending_messages.length; i++) {
			if (new Date().getTime($scope.sending_messages[i].create_time) == new Date().getTime(result.create_time)) {
				$scope.sending_messages[i].status = "finished";
			} else{};			
		};
	});

	mySocket.on('received message', function (result) {
		$scope.received_messages.push({content:result.content, create_time: result.create_time});
	});

	mySocket.on('special message', function (result) {
		console.log(result);
		$scope.received_messages.push({content:result.content, create_time: result.create_time});
	});


	$scope.sendMessage = function () {
		$scope.sending_messages.push({content:$scope.message,status:"unfinished", create_time: new Date()});	
		mySocket.emit('special', { message:$scope.message, create_time: new Date()});
	};

	// mySocket.
});
