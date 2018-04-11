'use strict';

angular.module('AppraisalGuru')
  .factory('reportSvc', function($http,$rootScope,$q) {
    var baseUrl = $rootScope.baseUrl;
    return {
      getDetail: function(id) {
          var deferred = $q.defer();
          return $http.get(baseUrl + '/report/'+id);
        }
       };

})