//loading the 'login' angularJS module
var login = angular.module('graph', []);
//defining the login controller
login.controller('graph_control', function($scope, $http) {
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
					//console.log(data[i].data.Category);
					var crimeCat = data[i].data.Category;
					console.log(data[i].data.PdDistrict);
					var district = data[i].data.PdDistrict;
					var c = 1;
					if (map.hasOwnProperty(crimeCat)) {
						//console.log(crimeCat);
						
						var val = Number(map[crimeCat]);
						//console.log(val);
						delete map[crimeCat];
						val = val + 1;
						//console.log(val);
						map[crimeCat] = val;
					}else{
						map[crimeCat] = c;
						
					}	
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
				var keys = [];
				var keys_district = [];
				var values_district = [];
				var values = [];
				for (var key_map in map) {
				    console.log(key_map + " -> " + map[key_map]);
				    keys.push(key_map);
				    values.push(map[key_map]);
				}
				for (var key_map_dist in map_district) {
				    console.log(key_map_dist + " -> " + map_district[key_map_dist]);
				    keys_district.push(key_map_dist);
				    values_district.push(map_district[key_map_dist]);
				}
				
				
				$(function () {
				    Highcharts.chart('container', {
				        chart: {
				            type: 'column'
				        },
				        title: {
				            text: 'Crime Category Coloumn Chart'
				        },
				        xAxis: {
				            categories: keys
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: 'No of Incidents'
				            },
				            stackLabels: {
				                enabled: true,
				                style: {
				                    fontWeight: 'bold',
				                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
				                }
				            }
				        },
				        legend: {
				            align: 'right',
				            x: -30,
				            verticalAlign: 'top',
				            y: 25,
				            floating: true,
				            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
				            borderColor: '#CCC',
				            borderWidth: 1,
				            shadow: false
				        },
				        tooltip: {
				            headerFormat: '<b>{point.x}</b><br/>',
				            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
				        },
				        plotOptions: {
				            column: {
				                stacking: 'normal',
				                dataLabels: {
				                    enabled: true,
				                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
				                }
				            }
				        },
				        series: [{
				            name: 'Crime Category',
				            data: values
				        }]
				    });
				});
				
				var myChart = Highcharts.chart('container2', {
					chart: {
			        renderTo: 'container',
			        backgroundColor: null
			    },

			    title: {
			    	text: 'Crime representation Category wise Graph',
			        style: {
			            color: '#CCC'
			        }
			    },
			    xAxis: {
			        categories: keys
			    },
			    
			    yAxis: {title: {
						    text: 'No of Incidents'
						},
			        labels: {
			            style: {
			                color: '#CCC'
			            }
			        },
			        gridLineColor: '#333'
			        
			    },

			    series: [{
			    	name: 'Crime Categories Ditricts',
			        data: values,
			        color: 'blue',
			        shadow: {
			            color: 'blue',
			            width: 10,
			            offsetX: 0,
			            offsetY: 0
			        }
			        
			    
			        
			    }]
			    });
		}).error(function(error) {
			console.log("Error Occured");
		});

})