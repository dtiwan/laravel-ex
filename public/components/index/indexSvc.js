'use strict';

angular.module('AppraisalGuru')
  .factory('indexSvc', function($http,$rootScope,$q) {
    var baseUrl = $rootScope.baseUrl;
    return {
      getSearch: function(search) {
          var deferred = $q.defer();
          $http.get(baseUrl + '/search/'+search)
                .then(function (data) {
                    deferred.resolve(data);
                })
                .catch(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
      // addServer: function(obj) {
      //     var deferred = $q.defer();
      //     $http.post(baseUrl + '/config/server', obj)
      //           .success(function (data) {
      //               deferred.resolve(data);
      //           })
      //           .error(function (data) {
      //               deferred.reject(data);
      //               $('body').pgNotification({
      //                 style: 'flip',
      //                 message: "Server with the same name already exist",   
      //                 position: 'top-right',
      //                 timeout: 3000,
      //                 type: 'error'
      //             }).show();
      //           });
      //       return deferred.promise;
      //   },
      //   updateServer: function(obj,id) {
      //     var deferred = $q.defer();
      //     $http.post(baseUrl + '/config/server/'+id, obj)
      //           .success(function (data) {
      //               deferred.resolve(data);
      //           })
      //           .error(function (data) {
      //               deferred.reject(data);
      //               $('body').pgNotification({
      //                 style: 'flip',
      //                 message: "Server with the same name already exist",   
      //                 position: 'top-right',
      //                 timeout: 3000,
      //                 type: 'error'
      //             }).show();
      //           });
      //       return deferred.promise;
      //   },
      //   deleteServer: function(obj) {
      //     var deferred = $q.defer();
      //     $http.delete(baseUrl + '/config/server/'+ obj.id)
      //           .success(function (data) {
      //                   deferred.resolve(data);
      //           })
      //           .error(function (data) {
      //               deferred.reject(data);
      //               $('body').pgNotification({
      //                 style: 'flip',
      //                 message: 'Invalid Credential',
      //                 position: 'top-right',
      //                 timeout: 3000,
      //                 type: 'error'
      //             }).show();
      //           });
      //       return deferred.promise;
      //   }
       };

})