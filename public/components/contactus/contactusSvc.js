
  'use strict';

angular.module('AppraisalGuru')
  .factory('contactusSvc', function($http,$rootScope,$q) {
    var baseUrl = $rootScope.baseUrl;
    return {
    	mailSend: function(data) {
	        var deferred = $q.defer();
	        return $http.post(baseUrl + '/contactus',data);
	    },
   };

})