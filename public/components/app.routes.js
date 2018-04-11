'use strict';

angular
    .module('AppraisalGuru')
    .config(['$ocLazyLoadProvider', '$locationProvider', function ($ocLazyLoadProvider, $locationProvider) {
	    $ocLazyLoadProvider.config({
	        debug: true,
	        events: false
	    });

    }])
    /*.factory('httpRequestInterceptor', function ($q, $localStorage, $injector, $rootScope, $location) {
        return {
            request: function (config) {
                if (config.url.includes('.html')) {
                    if ($localStorage.token) {
                        $rootScope.isLogin = true;
                    }else{
                        $rootScope.isLogin = false;
                    }
                }
                config.headers['Authorization'] = 'Bearer '+$localStorage.token;
                return config;
            }
        };
    })*/
    .config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider','jwtOptionsProvider',
            function ($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider, jwtOptionsProvider) {
            var Auth = ["$rootScope", "$q","$http","$state", function ($rootScope,$q,$http,$state) {
            var deferred = $q.defer();
            $http.get($rootScope.baseUrl + '/validateToken')
                .then(function(data) {
                    console.log(data);
                    deferred.resolve(data);
                })
                .catch(function(err){
                    console.log(err);
                    deferred.reject(err);
                    $state.go('home.login');
                });
                return deferred.promise;
            }];

            jwtOptionsProvider.config({
                tokenGetter: ['$localStorage', '$rootScope',  function($localStorage, $rootScope) {
                    if ($localStorage.token) {
                        $rootScope.isLogin = true;
                    }else{
                        $rootScope.isLogin = false;
                    }
                    var token = $localStorage.token;
                    console.log((token));
                    return token;
                }]
            });
            
            $httpProvider.interceptors.push('jwtInterceptor');
            //$httpProvider.interceptors.push('httpRequestInterceptor');
    	    $urlRouterProvider.otherwise('/');
            // Application routes
            $stateProvider
                .state("home", {
                    url: '',    
                    abstract: true,
                    serie: true,
                    views: {
                        header: {
                            templateUrl: 'components/common/header.html',
                            controller:'headerCtrl',
                            resolve: {
                                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        'components/common/headerSvc.js',
                                        'components/common/headerCtrl.js',
                                    ]);
                                }]
                            }
                        },
                        content:{
                            template: '<ui-view></ui-view>'
                        },
                        footer: {
                            templateUrl: 'components/common/footer.html',
                            controller:'headerCtrl',
                            resolve: {
                                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        'components/common/footerSvc.js',
                                        'components/common/footerCtrl.js',
                                    ]);
                                }]
                            }
                        },
                    }
                })
                .state('home.index', {
                	url: '/',
                    controller: 'indexCtrl',
                    templateUrl: 'components/index/index.html',
                    serie: true,        
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'components/index/indexSvc.js',
                                'components/index/indexCtrl.js',
                            ]);
                        }]
                    }
                })
                .state('home.search_result', {
                    url: '/search_result',
                    controller: 'search_resultCtrl',
                    templateUrl: 'components/search_result/search_result.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'components/search_result/search_resultCtrl.js',
                                'components/search_result/search_resultSvc.js'
                            ]);
                        }]
                    }
                })
                .state('home.report', {             
                    url: '/report',
                    controller: 'reportCtrl',
                    templateUrl: 'components/report/report.html',
                    serie: true,
                    resolve: { 
                        auth: Auth,             
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'components/report/reportCtrl.js',
                                'components/report/reportSvc.js'
                            ]);
                        }]
                    }
                })
                .state('home.login', {             
                    url: '/login',
                    controller: 'loginCtrl',
                    templateUrl: 'components/login/login.html',
                    resolve: {              
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'components/login/loginCtrl.js',
                                'components/login/loginSvc.js'
                            ]);
                        }]
                    }
                })
                .state('home.resetPassword', {             
                    url: '/resetpassword/:email/:token',
                    controller: 'resetPasswordCtrl',
                    templateUrl: 'components/resetPassword/resetPassword.html',
                    resolve: {              
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'components/resetPassword/resetPasswordCtrl.js',
                                'components/resetPassword/resetPasswordSvc.js'
                            ]);
                        }]
                    }
                })
                .state('home.forgotPassword', {             
                    url: '/forgotpassword',
                    controller: 'forgotPasswordCtrl',       
                    templateUrl: 'components/forgotPassword/forgotPassword.html',
                    resolve: {              
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'components/forgotPassword/forgotPasswordCtrl.js',
                                'components/forgotPassword/forgotPasswordSvc.js'
                            ]);
                        }]      
                    }
                })
                .state('home.resources', {             
                    url: '/resources',
                    controller: 'resourcesCtrl',       
                    templateUrl: 'components/resources/resources.html',
                    resolve: {              
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'components/resources/resourcesCtrl.js',
                                'components/resources/resourcesSvc.js'
                            ]);
                        }]      
                    }
                })
                .state('home.contactus', {             
                    url: '/contactus',
                    controller: 'contactusCtrl',       
                    templateUrl: 'components/contactus/contactus.html',
                    resolve: {              
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'components/contactus/contactusCtrl.js',
                                'components/contactus/contactusSvc.js'
                            ]);
                        }]      
                    }
                })
                .state('home.termsOfService', {             
                    url: '/terms-of-service',
                    controller: 'termsOfServiceCtrl',       
                    templateUrl: 'components/terms_of_service/terms_of_service.html',
                    resolve: {              
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'components/terms_of_service/terms_of_serviceCtrl.js',
                                'components/terms_of_service/terms_of_serviceSvc.js'
                            ]);
                        }]      
                    }
                })

    }]);
