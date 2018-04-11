'use strict';

	angular.module('AppraisalGuru').controller('search_resultCtrl', ['$scope', '$state', '$rootScope', '$http', 'search_resultSvc','$sce',
	    function($scope,$state,$rootScope,$http,search_resultSvc,$sce) {

            $scope.QuickRefID = sessionStorage.QuickRefID;

            if($scope.QuickRefID == undefined){
                $state.go('home.index');
                return;
            }

            console.log($scope.QuickRefID);
            search_resultSvc.getDetail($scope.QuickRefID).then(function(response) {
                $scope.details = response.data;
                $scope.details.PropertyDetail.Situs = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?q="+$scope.details.PropertyDetail.Situs+"&zoom=18 &key=AIzaSyAlxJQONqgXPttoPvGI5XHRlVRpGBNJSNE &maptype=satellite");
                console.log($scope.details);
                console.log($scope.details.CountyAppealsRate[0].county_2014)
                $('.loading').removeClass('active');
                $scope.countyAppealAvailable = false;
                if($scope.details.selectedProperty[0].CountyCode == 1){
                    console.log('Updating graph.');
                    $scope.countyAppealAvailable = true;
                    $scope.updateGraph($scope.details);
                }
            });

            $scope.updateGraph = function(data){

                Highcharts.chart('container', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Appeals Volume'
                    },
                    subtitle: {
                        text: '2016 Data'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                        name: 'Brands',
                        colorByPoint: true,
                        data: [{ 
                            name: 'Appeals',
                            y: data.AppealsVolume.Appeals
                        }, {
                            name: 'No Appeals',
                            y: data.AppealsVolume.NoAppeals,
                            sliced: true,
                            selected: true
                        }]
                    }]
                });

                 Highcharts.chart('container2', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Appeals Success Rate'
                    },
                    subtitle: {
                        text: '2016 Data'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                        name: 'Success Rate',
                        colorByPoint: true,
                        data: [{
                            name: 'Unsuccessful',
                            y: data.AppealsSuccessRate.Unsuccessful
                        }, {
                            name: 'Successful',
                            y: data.AppealsSuccessRate.Successful,
                            sliced: true,
                            selected: true
                        }]
                    }]
                });

                 Highcharts.chart('container3', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'County Vs. Neighborhood'
                    },
                    subtitle: {
                        text: '2016 Data'
                    },
                    xAxis: {
                        categories: [
                            '2016'
                        ],
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Appeals Rate(%)'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: 'County',
                        data: [parseInt(data.CountyAppealsRate[0].county_2016)]

                    }, {
                        name: 'Neighborhood',
                        data: [parseInt(data.NeighborhoodAppealsRate[0].ngbrhd_2016)]

                    }]
                });
            }
            
            window.scrollTo(0, 100);


	    }]);
