'use strict';
angular
    .module('AppraisalGuru', [
        'ui.router',
        'oc.lazyLoad',	
        'ngMessages',	
        'ngStorage',
        'angular-jwt' 	
    ]).run(['$rootScope','$location','authManager', '$localStorage',
       function($rootScope,$location, authManager, $localStorage) {
    	$rootScope.baseUrl = $location.$$protocol+'://'+$location.$$host+':'+$location.$$port+'/api';

	authManager.checkAuthOnRefresh();

	$rootScope.$on('tokenHasExpired', function() {
		$rootScope.isLogin = false;
		$localStorage.$reset();
	});
    }]);	
