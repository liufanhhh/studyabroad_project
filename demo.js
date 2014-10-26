
	var app = angular.module("MyApp", []);
	app.controller("Trycontroller",
    	function ($scope)
    	{
    		$scope.status=true;
			$scope.setregister = function()
			{	
				$scope.status=!$scope.agree;
			};


			$scope.aa=function(a){
				return "待办事项";

			}

 		$scope.myData = new Date();
			$scope.register=function()
			{	
					
						if($scope.password1 == $scope.password2)
							{	
								$scope.list.push
									({
						        reguser: $scope.nguser,
						        regpassword1: $scope.password1
									});
							    $scope.nguser = null;
							    $scope.password1 = null;
							    $scope.password2 = null;
							    $scope.agree = null;
								$scope.status=true;
							}

						else
							{
								alert("password are not same");
								$scope.password2=null;
								
								
							}
			};
			$scope.reset = function(nowindex)
			{
				$scope.list.splice(nowindex,1 );


			}



  			$scope.list = 
  			[	

			];





		});
