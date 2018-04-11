'use strict';

	angular.module('AppraisalGuru').controller('headerCtrl', ['$scope', '$rootScope', '$http','headerSvc','$localStorage',
    function($scope,$rootScope,$http,headerSvc,$localStorage) {

        headerSvc.checkuser().then(function(response) {
            $rootScope.userLogin = true;
        }).catch(function(err){
             $rootScope.userLogin = false;
        });

        $scope.logout = function(){
        	$rootScope.isLogin = false;
        	$localStorage.$reset();
        }

        $(document).ready(function() {
                
            
            $('.mbr-navbar--auto-collapse .mbr-navbar__hamburger').click(function(event){
                event.stopImmediatePropagation();
                $(this).toggleClass('mbr-hamburger--open')
                            .parents('.mbr-navbar')
                            .toggleClass('mbr-navbar--open')
                            .removeClass('mbr-navbar--short');
                });
           });

            $('.mbr-navbar--auto-collapse .mbr-navbar__item').click(function(){
                 $('.mbr-navbar--auto-collapse .mbr-navbar__hamburger').removeClass('mbr-hamburger--open');
                 $('.mbr-navbar--absolute').removeClass('mbr-navbar--open');
            });
         

    }]);