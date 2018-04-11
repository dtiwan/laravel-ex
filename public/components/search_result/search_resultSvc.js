'use strict';

angular.module('AppraisalGuru')
  .factory('search_resultSvc', function($http,$rootScope,$q) {
    var baseUrl = $rootScope.baseUrl;
    return {
      getDetail: function(id) {
          var deferred = $q.defer();
          $http.get(baseUrl + '/detail/'+id)
                .then(function (data) {
                    deferred.resolve(data);
                })
                .catch(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
   };

})