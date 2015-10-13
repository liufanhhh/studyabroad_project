.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);

function testController($scope){    
    $scope.upload = function(file_list) {
        formData = new FormData();
        for (var i = 0; i < file_list.length; i++) {
            formData.append(i + "", file_list[i]);
        }
        formData.append("owner", $scope.curr_project._id);
        formData.append("owner_type", "project");
        $http.post('/img/upload', formData, {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: function(data) {
                return data;
            }
        }).
        success(function(res, status, headers, config) {
            if (res.status == 1) {
                $scope.timestamp = new Date().getTime();
            };
        }).
        error(function(res, status, headers, config) {
            alert("failed!");
        });
    }
var file = $scope.myFile;
var uploadUrl = 'http://www.example.com/images';
fileUpload.uploadFileToUrl(file, uploadUrl);
}