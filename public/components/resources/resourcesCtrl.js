'use strict';

	angular.module('AppraisalGuru').controller('resourcesCtrl', ['$scope', '$state', '$rootScope', '$http', 'resourcesSvc','$localStorage',
	    function($scope, $state,$rootScope,$http,resourcesSvc,$localStorage) {
	    		
	    	$('.accordion1 .accordion-group .panel-title a, .toggle1 .accordion-group .panel-title a').click(function(event){
	    		event.preventDefault();
	    	});
            
            window.scrollTo(0, 100);

	    }]);