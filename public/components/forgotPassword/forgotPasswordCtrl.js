'use strict';

	angular.module('AppraisalGuru').controller('forgotPasswordCtrl', ['$scope', '$state', '$rootScope', '$http', 'forgotPasswordSvc','$localStorage',
	    function($scope,$state,$rootScope,$http,forgotPasswordSvc,$localStorage) {

	    	if($rootScope.isLogin){
	    		$state.go('home.index');
	    		return;
	    	}			

	    	$scope.forgotPasswordAlert =  null;

	    	$scope.forgotPassword = function(){
	    		console.log($scope.forgotPasswordData);
	    		if($scope.forgotPasswordform.$invalid){
		        		angular.forEach($scope.forgotPasswordform.$error, function (field) {
					        angular.forEach(field, function(errorField){
					            errorField.$setTouched();
					        })
					    });
		        }else{
		        	forgotPasswordSvc.forgotPasswordRequest($scope.forgotPasswordData).then(function(response) {
		        		console.log(response.data);
		        		if(response.data.message == "password reset mail send"){
		        			$scope.forgotPasswordAlert = "Email sent successfully. Check your email.";
		        		}else{
		        			
		        		}
			        })
			        .catch(function(err){
			        	console.log(err.data);
			        	if(err.data.error != undefined){
			        		$scope.forgotPasswordAlert = err.data.error;
			        	}else{
			        		$scope.forgotPasswordAlert = err.data.email[0];	
			        	}
			        	
			        })

			        $scope.forgotPasswordAlert = null;
	        		$scope.forgotPasswordform.$setUntouched;	
	    			$scope.forgotPasswordform.$setPristine;		
		        }
	    	}
	    	   
	    }]);	    	
