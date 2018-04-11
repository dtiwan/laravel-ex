'use strict';

	angular.module('AppraisalGuru').controller('contactusCtrl', ['$scope', '$state', '$rootScope', '$http', 'contactusSvc','$localStorage',
	    function($scope, $state,$rootScope,$http,contactusSvc,$localStorage) {

	    	$scope.contactusalert = null;


	    	$scope.contactus = function(){
	    		console.log($scope.contactusdata);
	    		if($scope.contactusform.$invalid){
	        		angular.forEach($scope.contactusform.$error, function (field) {
				        angular.forEach(field, function(errorField){
				            errorField.$setTouched();
				        })
				    });
	        	}else{
	        		contactusSvc.mailSend($scope.contactusdata).then(function(response) {
		        		console.log(response.data);

		        		$scope.contactusalert = "Message Successfully sent";

			        })
			        .catch(function(err){
			        	console.log(err);
			        	console.log(err.data.email);
			        	$scope.contactusalert = err.data.email[0];	
			        })	
			        
			        $scope.contactusalert = null;
		        	$scope.contactusform.$setUntouched;	
		    		$scope.contactusform.$setPristine;
	        	}
	    		
	    	}
            window.scrollTo(0, 100);
	    }]);