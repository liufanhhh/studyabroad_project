var IndexApp = angular.module('IndexApp', ['ngResource', 'ngRoute']);

/*
 * routes for saindex.html
 */
IndexApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'html/MainHtml/main.html',
        controller: 'mainController'
    }).
    when('/activity', {
        templateUrl: 'html/MainHtml/activity.html',
        controller: 'activityController'
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

IndexApp.controller('indexController', function($scope, $resource, $routeParams, $location) {

	$scope.feedback_show = false;
    $scope.user = {};
    $scope.same_password = false;
    $scope.login_page = false;
    $scope.register_page = false;
    $scope.register_result = "";


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

    $scope.registerPage = function(){
        $scope.login_page = false;
        $scope.register_page = true;
    };

    $scope.loginPage = function(){
        $scope.login_page = true;
        $scope.register_page = false;
    };

    $scope.createHash = function (version, old_password, token1, token2) {
        var new_password;
        if (version == 1) {
            new_password = md5.createHash(md5.createHash(old_password+token1)+token2);
        } else if (version == 2){
            new_password = md5.createHash(md5.createHash(md5.createHash(old_password)+token1)+token2);
        };
        return new_password;
    }

    //用户注册
    $scope.register = function(){
        $scope.merchant.password = md5.createHash($scope.merchant.password);
        $resource("/merchant/profile/create").save({
            merchant: $scope.merchant
        }, function(res) {
            if (res.status == 1) {
                $scope.merchant = res.data;
                $scope.merchant.password = $scope.createHash(1, $scope.merchant.password, $scope.merchant._id, $scope.merchant.create_time);
                $scope.merchant.password_confirmation = null;
                $resource("/merchant/profile/password").save({
                    merchant_id: $scope.merchant.merchant_id,
                    new_password: $scope.merchant.password
                }, function(res) {
                    if (res.status == 1) {
                        $scope.merchant = {};
                        $scope.login_page = true;
                        $scope.register_page = false;
                    };
                    $scope.register_result = res.mess;
                });
            };
            $scope.register_result = res.mess;
        });

    };

    $scope.login = function(){
        $resource("/merchant/profile/token").save({
            email: $scope.merchant.email
        }, function(res) {
            var token1 = res.data.token1;
            var token2 = res.data.token2;
            console.log(token1);
            console.log(token2);
            $scope.merchant.password = $scope.createHash(2, $scope.merchant.password, token1, token2);
            $resource("/merchant/login").save({
                email: $scope.merchant.email,
                password: $scope.merchant.password
            }, function(res) {
                console.log(res.location);
                window.location = res.location;
            });
        });
    };
});

IndexApp.controller('mainController', function($scope, $resource, $routeParams, $location) {
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

IndexApp.controller('activityController', function($scope, $resource, $routeParams, $location) {

});

IndexApp.controller('downloadController', function($scope, $resource, $routeParams, $location) {

});

IndexApp.controller('grouponController', function($scope, $resource, $routeParams, $location) {

});

IndexApp.controller('schoolController', function($scope, $resource, $routeParams, $location) {

});