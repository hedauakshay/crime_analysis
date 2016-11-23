
var homepage = angular.module('donut',[]);
// google.charts.load('upcoming', {'packages':['geochart']});

homepage.controller('donut_control', function($scope, $http) {
	
	$scope.onload = function(){
		console.log("sfwefwe");
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback($scope.drawChart_2);
		google.charts.setOnLoadCallback($scope.drawChart_Pie);
       // $scope.getHeatMap();
	}
	
	$scope.drawChart_Pie = function(){
		var data = new google.visualization.DataTable();
		data.addColumn('string','day');
		data.addColumn('number','Crime count');
		for(var i=0;i<$scope.data2.length;i++){
			data.addRow([$scope.data2[i]['_id'],$scope.data2[i]['count']]);
		}
		var options = {
          title: 'Day wise crime Donut chart',
          animation:{
			duration:1000,
			easing: 'out'
		},
          pieHole: 0.4,
        };

        var chart = new google.visualization.PieChart(document.getElementById('map'));
        chart.draw(data, options);
	}
	
	$scope.drawChart_2=function(){
		console.log($scope.data);
		var days = {"Sunday":[],"Monday":[],"Tuesday":[],"Wednesday":[],"Thursday":[],"Friday":[],"Saturday":[]}
       for(var i=0;i<$scope.data.length;i++){
       		var day = $scope.data[i]['_id']['day'];
       		var temp = {'Category':$scope.data[i]['_id']['category'],'Count':$scope.data[i]['count']};
       		days[day].push(temp);
       }
       days['Monday'].sort(compare);
       days['Tuesday'].sort(compare);
       days['Wednesday'].sort(compare);
       days['Thursday'].sort(compare);
       days['Friday'].sort(compare);
       days['Saturday'].sort(compare);
       days['Sunday'].sort(compare);
	 	function compare(a,b) {
		  if (a.Category < b.Category)
		    return -1;
		  if (a.Category > b.Category)
		    return 1;
		  return 0;
		}

		var data = new google.visualization.DataTable();
		data.addColumn('string','Category');
		var mon = ['Monday'];
		var tue = ['Tuesday'];
		var wed = ['Wednesday'];
		var thu = ['Thursday'];
		var fri = ['Friday'];
		var sat = ['Saturday'];
		var sn = ['Sunday'];
		
		for(var i = 0;i<days['Friday'].length;i++){
			data.addColumn('number',days['Sunday'][i]['Category']);
			mon.push(days['Monday'][i]['Count']||0);
			tue.push(days['Tuesday'][i]['Count']||0);
			wed.push(days['Wednesday'][i]['Count']||0);
			thu.push(days['Thursday'][i]['Count']||0);
			fri.push(days['Friday'][i]['Count']||0);
			sat.push(days['Saturday'][i]['Count']||0);
			sn.push(days['Sunday'][i]['Count']||0);
		}

		// data.addColumn(col);
		data.addRow(mon);
		data.addRow(tue);
		data.addRow(wed);
		data.addRow(thu);
		data.addRow(fri);
		data.addRow(sat);
		data.addRow(sn);

		var options = {
          title: 'Crime scenes by DayOfWeek',
          vAxis: {title: 'Crime Count'},
          isStacked: true
        };

        var chart = new google.visualization.SteppedAreaChart(document.getElementById('map2'));

        chart.draw(data, options);
	}
});
