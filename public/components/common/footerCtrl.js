'use strict';

	angular.module('AppraisalGuru').controller('footerCtrl', ['$scope', '$rootScope', '$http','footerSvc','$localStorage',
    function($scope,$rootScope,$http,footerSvc,$localStorage) {

        headerSvc.checkuser().then(function(response) {
            $rootScope.userLogin = true;
        }).catch(function(err){
             $rootScope.userLogin = false;
        });

        $scope.logout = function(){
        	$rootScope.isLogin = false;
        	$localStorage.$reset();
        }

    }]);