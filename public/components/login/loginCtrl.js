'use strict';

	angular.module('AppraisalGuru').controller('loginCtrl', ['$scope', '$state', '$rootScope', '$http', 'loginSvc','$localStorage',
	    function($scope,$state,$rootScope,$http,loginSvc,$localStorage) {

	    		if($rootScope.isLogin){
		    		$state.go('home.index');
		    		return;
		    	}
	    	
	    	   $scope.signupform ={};
	    	   $scope.singupalert = null;
	    	   $scope.loginalert = null;	
	    	   $scope.itemChecked = true;	


               $scope.signUp = function(){
               		if($scope.signupform.$invalid){
		        		angular.forEach($scope.signupform.$error, function (field) {
					        angular.forEach(field, function(errorField){
					            errorField.$setTouched();
					        })
					    });
		        	}else if(!$scope.termsOfService){
		        		$scope.itemChecked = false;
		        	}else{
		        		loginSvc.signupDetail($scope.signupdata).then(function(response) {
			        		console.log(response.data);
			        		if(response.data.message == "Successfully created user!"){
			        			$scope.singupalert = "Account successfully created.  You can log in now.";
			        		}

				        })
				        .catch(function(err){
				        	console.log(err);
				        	console.log(err.data.email);
				        	$scope.singupalert = err.data.email[0];	
				        })

				        $scope.itemChecked = true;
				        $scope.singupalert = null;
			        	$scope.signupform.$setUntouched;	
			    		$scope.signupform.$setPristine;			
		        	}
               }

               $scope.login = function(){
               		if($scope.loginform.$invalid){
		        		angular.forEach($scope.loginform.$error, function (field) {
					        angular.forEach(field, function(errorField){
					            errorField.$setTouched();
					        })
					    });
		        	}else{
		        		console.log($scope.logindata);	
		        		loginSvc.loginDetail($scope.logindata).then(function(response) {
			        		console.log(response.data);
			        		$localStorage.token = response.data.token;

			        		$scope.QuickRefID = sessionStorage.QuickRefID;
			        		if($scope.QuickRefID == undefined){
			        			$state.go('home.index');
			        		}else{
			        			$state.go('home.report');
			        		}

				        })
				        .catch(function(err){
				        	console.log(err);
				        	console.log(err.data.email);
				        	if(err.data.error == "Invalid Credentials"){
				        		$scope.loginalert = err.data.error;
				        	}else{
				        		$scope.loginalert = err.data.email[0];
				        	}
				        	
				        })
			        	
			        	$scope.signupform.$setUntouched;	
			    		$scope.signupform.$setPristine;
		        	}
               }

	    }]);