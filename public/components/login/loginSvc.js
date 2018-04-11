'use strict';

angular.module('AppraisalGuru')
  .factory('loginSvc', function($http,$rootScope,$q) {
    var baseUrl = $rootScope.baseUrl;
    return {
      loginDetail: function(data) {
        var deferred = $q.defer();
        return $http.post(baseUrl + '/user/signin',data);
      },
      signupDetail: function(data) {
        var deferred = $q.defer();
        return $http.post(baseUrl + '/user/signup', data);
      },
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