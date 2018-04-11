'use strict';

	angular.module('AppraisalGuru').controller('reportCtrl', ['$scope', '$state', '$rootScope', '$http', 'reportSvc',
	    function($scope,$state,$rootScope,$http,reportSvc) {
            

         	$scope.QuickRefID = sessionStorage.QuickRefID;

         	if($scope.QuickRefID == undefined){
                $state.go('home.index');
                return;
            }

        	console.log($scope.QuickRefID);
            reportSvc.getDetail($scope.QuickRefID).then(function(response) {
        		$scope.report = response.data;
        		console.log($scope.report);
        		$scope.TimeAndGraph();
        		$('.loading').removeClass('active');

	        })
	        .catch(function(err){
	        	console.log(err);
	        })


	        $scope.TimeAndGraph = function(){
                 
                $(document).load(function(){
                    console.log('df');
                });

	        	jQuery("#time-countdown").countdown("2017/05/31", function(event) {
                    console.log(event.strftime('%D days %H:%M:%S'));
                    jQuery(this).text(
                      event.strftime('%D days %H:%M:%S')
                    );
                });

	        	var chartColumn = new Highcharts.Chart({
                    chart: {
                        renderTo: 'chart-column',
                        type: 'spline',
                        backgroundColor: '#FFFFFF   ',
                        spacingTop: 20
                    },
                    title: {
                        text: 'Cummulative Tax Savings ($)',
                        style: {
                            color:'#585858' 
                        }
                    },
                    xAxis: {
                        categories: [
                            'Year 1',
                            'Year 2',
                            'Year 3',
                            'Year 4',
                            'Year 5'
                        ]
                    },
                    credits: {
                        enabled: false
                    },
                    yAxis: {
                        labels: {
                            format: '$ {value}'
                        },
                        title: {
                            text: ' '
                        }
                    },
                    legend: {
                        enabled: false,
                        layout: 'vertical',
                        backgroundColor: '#FFFFFF',
                        align: 'left',
                        verticalAlign: 'top',
                        x: 400,
                        y: 70,
                        floating: true,
                        shadow: true
                    },
                    tooltip: {
                        formatter: function() {
                            return ''+
                                this.x +': '+ this.y +' $';
                        }
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                        series: [{
                        name: 'Cummulative Savings',
                        data: [250, 525, 827.5, 1160.25, 1526.275]
            
                    }]
                });
                
                var $slider = $('input[name="slider1"]');
                
                $slider.bind('click', function(e) {
                    e.preventDefault();
                        chartColumn.series[0].data[0].update(parseInt($(this).val()*2.5*0.01*1.0));
                        chartColumn.series[0].data[1].update(parseInt($(this).val()*2.5*0.01*2.1));
                        chartColumn.series[0].data[2].update(parseInt($(this).val()*2.5*0.01*3.31));
                        chartColumn.series[0].data[3].update(parseInt($(this).val()*2.5*0.01*4.64));
                        chartColumn.series[0].data[4].update(parseInt($(this).val()*2.5*0.01*6.10));

                });

	        }

            window.scrollTo(0, 100);
	    }]);


