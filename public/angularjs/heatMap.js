
var homepage = angular.module('heat_map',[]);
// google.charts.load('upcoming', {'packages':['geochart']});

homepage.controller('heat_control', function($scope, $http) {

	$scope.onload = function(){
        var options = {};		
		var heatMapData = [];
		console.log(JSON.stringify($scope.data));
		for(var i=0;i<$scope.data.length;i++){
			var temp = {};
			temp['location'] = new google.maps.LatLng($scope.data[i]['_id']['y'],$scope.data[i]['_id']['x']);
			temp['weight'] = $scope.data[i]['count']*10;
			heatMapData.push(temp);
		}

      var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);

      map = new google.maps.Map(document.getElementById('map'), {
        center: sanFrancisco,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 12,
        mapTypeId: 'satellite'
      });
      console.log(JSON.stringify(heatMapData));
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData,
        map: map,
        radius: 60
      });
	}
});
