var MerchantProfileApp = angular.module('MerchantProfileAPP', ['ngResource', 'ngRoute']);

MerchantProfileApp.controller('MerchantProfileController', function($scope, $resource, $routeParams, $location) {
	$scope.register_show = false;
	$scope.login_show = false;
	$scope.otherfuction_show = false;
	$scope.feedback_show = false;
	$scope.agree = true;
    //注册验证中的密码相同检验
    $scope.same_password=false;
    /*  监视密码2的输入，如果输入和密码1的相同，则可以注册。
    若不同，或者两个密码都为空，则不可注册。*/
//     $scope.$watch("password_cf", function(newVal,oldVal,scope){
//         if (newVal === oldVal){
//         }
//         else if(!$scope.password_cf){
//             $scope.same_password=false;
//         }
//         else if($scope.password !== $scope.password_cf){
//             $scope.same_password=false;
//         }
//         else if($scope.password === $scope.password_cf){
//             $scope.same_password=true;
//         }
//     });
// /*  按监视密码2的方法监视密码1*/
//     $scope.$watch("password", function(newVal,oldVal,scope){
//         if (newVal === oldVal){
//         }
//         else if(!$scope.password){
//             $scope.same_password=false;
//         }
//         else if($scope.password !== $scope.password_cf){
//             $scope.same_password=false;
//         }
//         else if($scope.password === $scope.password_cf){
//             $scope.same_password=true;
//         }
//     });

//     $scope.register = function() {
//         $resource("/register").get({
//             nickname: $scope.nickname,
//             email: $scope.email,
//             password: $scope.password
//         }, function(res) {
//                 $scope.reg_mess = res.mess;
//         });
//     }

});
