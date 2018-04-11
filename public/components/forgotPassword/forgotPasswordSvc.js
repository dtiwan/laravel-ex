'use strict';

angular.module('AppraisalGuru')
  .factory('forgotPasswordSvc', function($http,$rootScope,$q) {
    var baseUrl = $rootScope.baseUrl;
    return {
      forgotPasswordRequest: function(data) {
        var deferred = $q.defer();
        return $http.post(baseUrl + '/password/email',data);
      },
  };
})