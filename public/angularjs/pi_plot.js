//loading the 'login' angularJS module
var login = angular.module('pie', []);
//defining the login controller
login.controller('pie_control', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false

		$http({
			method : "GET",
			url : '/getRecommendationRes'
			}).success(function (data) {
				//console.log(data);
				var map = new Object();
				var map_district = new Object();
				for(var i = 0; i< data.length; i++)
				{
					console.log(data[i].data.PdDistrict," -> ",data[i].data.Time);
					var district = data[i].data.PdDistrict;
					var c = 1;	
					if (map_district.hasOwnProperty(district)) {
						//console.log(crimeCat);
						
						var val2 = Number(map_district[district]);
						//console.log(val);
						delete map_district[district];
						val2 = val2 + 1;
						//console.log(val);
						map_district[district] = val2;
					}else{
						map_district[district] = c;
					}
						
				}
				var keys_district = [];
				var values_district = [];
				for (var key_map_dist in map_district) {
				    console.log(key_map_dist + " -> " + map_district[key_map_dist]);
				    keys_district.push(key_map_dist);
				    values_district.push(map_district[key_map_dist]);
				}
				
				
			    var final_chart = [];
			    
			    for(var i=0; i < keys_district.length; i++) {
			    	final_chart.push({
			            name: keys_district[i],
			            y: values_district[i]			 
			        }); 	   
			    }    
			    
			    
			    var myChart = Highcharts.chart('container', {
			        chart: {
			        className: 'skies',
			      plotShadow: true,
			      plotBackgroundImage: 'http://www.highcharts.com/demo/gfx/skies.jpg',
			      plotBackgroundColor: {
			         linearGradient: [0, 0, 250, 500],
			         stops: [
			            [0, 'rgba(255, 255, 255, 1)'],
			            [1, 'rgba(255, 255, 255, 0)']
			         ]
			      },
			      plotBorderWidth: 1,
			            type: 'pie'
			        },
			        title: {
			            text: 'District wise presentation of Crime'
			        },
			        tooltip: {
			            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			        },
			        plotOptions: {
			            pie: {
			                allowPointSelect: true,
			                cursor: 'pointer',
			                dataLabels: {
			                    enabled: true,
			                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
			                    style: {
			                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
			                    }
			                }
			            }
			        },
			        series: [{
			            name: "Brands",
			            colorByPoint: true,
			            data: final_chart
			        }]
			    });

		}).error(function(error) {
			console.log("Error Occured");
		});

})