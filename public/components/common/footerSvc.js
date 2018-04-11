'use strict';

angular.module('AppraisalGuru')
  .factory('footerSvc', function($http,$rootScope,$q) {
    var baseUrl = $rootScope.baseUrl;
    return {
      checkuser: function(data) {
        var deferred = $q.defer();
        return $http.get($rootScope.baseUrl + '/validateToken');
      },
   };

})