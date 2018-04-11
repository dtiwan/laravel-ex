'use strict';

angular.module('AppraisalGuru')
  .factory('resetPasswordSvc', function($http,$rootScope,$q) {
    var baseUrl = $rootScope.baseUrl;
    return {
      resetPasswordRequest: function(data) {
        var deferred = $q.defer();
        return $http.post(baseUrl + '/password/reset',data);
      },
  };
})