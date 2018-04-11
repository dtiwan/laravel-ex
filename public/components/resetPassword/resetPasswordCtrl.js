'use strict';

	angular.module('AppraisalGuru').controller('resetPasswordCtrl', ['$scope', '$state', '$rootScope', '$http', 'resetPasswordSvc','$localStorage',
	    function($scope, $state,$rootScope,$http,resetPasswordSvc,$localStorage) {

	    	if($rootScope.isLogin){
	    		$state.go('home.index');
	    		return;
	    	}

	    	$scope.resetPasswordAlert =  null;
  			console.log($state.params);
	    	$scope.resetPasswordSubmit = function(){
	    		if($scope.resetPasswordform.$invalid){
		        		angular.forEach($scope.resetPasswordform.$error, function (field) {
					        angular.forEach(field, function(errorField){
					            errorField.$setTouched();
					        })
					    });
		        }else{
		        	$scope.resetPasswordData.email = $state.params.email;
		        	$scope.resetPasswordData.token = $state.params.token;
		        	console.log($scope.resetPasswordData);	
		        	resetPasswordSvc.resetPasswordRequest($scope.resetPasswordData).then(function(response) {
		        		console.log(response.data);
		        		$scope.resetPasswordAlert = response.data.message;
			        })
			        .catch(function(err){
			        	console.log(err);
			        	console.log(err.error);
			        	$scope.resetPasswordAlert = err.error;	
			        })

			        $scope.resetPasswordAlert = null;
	        		$scope.resetPasswordform.$setUntouched;	
	    			$scope.resetPasswordform.$setPristine;		
		        }
	    	}
	    	  
	    }]);