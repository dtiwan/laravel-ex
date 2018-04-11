'use strict';

	angular.module('AppraisalGuru').controller('indexCtrl', ['$scope', '$state', '$rootScope', '$http', 'indexSvc',
	    function($scope,$state,$rootScope,$http,indexSvc) {
                
            console.log($rootScope.userLogin);

            $scope.findResult = function(){
                if ($scope.search.length >= 3){
                    indexSvc.getSearch($scope.search).then(function(response) {
                        console.log(response.data);
                        $scope.searchResult = response.data;
                    });
                }        
            }

            $scope.propertyDetails = function(index){
                var QuickRefID = $scope.searchResult[index].QuickRefID;
                sessionStorage.QuickRefID = QuickRefID;
                
                if($rootScope.isLogin){     
                    $state.go('home.report');
                }else{
                    $state.go('home.search_result');
                }

            }
            
             window.scrollTo(0, 100);

	    }]);