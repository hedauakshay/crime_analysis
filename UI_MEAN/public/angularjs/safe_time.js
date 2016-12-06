//loading the 'login' angularJS module
var login = angular.module('safe', []);
//defining the login controller
login.controller('safe_control', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	console.log("Sfwsfweqw");
	$scope.submit = function () {
		
		console.log($scope.time_val);
		console.log($scope.area);
		var input_time = $scope.time_val;
		var input_area = $scope.area;
        $scope.myTxt = "You clicked submit!";
		$http({
			method : "GET",
			url : '/getRecommendationRes'
			}).success(function (data) {
				//console.log(data);
				var map = new Object();
				
				var out_cat = [];
				var out_desc = [];
				var out_add = [];
				var out_time = [];
				var map_district = new Object();
				for(var i = 0; i< data.length; i++)
				{
					//console.log(data[i].data.PdDistrict," -> ",data[i].data.Time);
					var district = data[i].data.PdDistrict;
					var time = data[i].data.Time;
					var hh = parseInt(input_time);
					
//					console.log(time);
//					console.log(parseInt(time)-1);
//					console.log(parseInt(time)+1);
					console.log(hh);
					if((hh >= (parseInt(time)-1) && hh <= (parseInt(time)+1)) && district == input_area)
					{
						//console.log("Matched");
						//console.log(time);
						out_cat.push(data[i].data.Category);
						out_desc.push(data[i].data.Descript);
						out_add.push(data[i].data.Address);
						out_time.push(time);
					}
						
//					var c = 1;	
//					if (map_district.hasOwnProperty(district)) {
//						//console.log(crimeCat);
//						
//						var val2 = Number(map_district[district]);
//						//console.log(val);
//						delete map_district[district];
//						val2 = val2 + 1;
//						//console.log(val);
//						map_district[district] = val2;
//					}else{
//						map_district[district] = c;
//					}
						
				}
//				var keys_district = [];
//				var values_district = [];
//				for (var key_map_dist in map_district) {
//				    console.log(key_map_dist + " -> " + map_district[key_map_dist]);
//				    keys_district.push(key_map_dist);
//				    values_district.push(map_district[key_map_dist]);
//				}
//				
				$scope.arr_cat = out_cat;
				$scope.arr_desc = out_desc;
				$scope.arr_add = out_add;
				if(out_cat.length==0)
				{
					console.log("Inside Warning");
					$scope.warning = "SAFE!";
					$scope.formSubmitted = false;
				}else if(out_cat.length>=4){
					$scope.warning = "UNSAFE!";
					$scope.formSubmitted = true;
				}else{
					$scope.warning = "BE CAREFULL!";
					$scope.formSubmitted = true;
				}
				
					
				
					
				console.log(out_cat);
				$scope.name = "Few recent Incidents in "+ input_area +" around "+ input_time;
			    var final_chart = [];
			    
			    for(var i=0; i < out_time.length; i++) {
			    	console.log(out_cat[i] + " -> " + out_desc + " -> " + out_add + " -> " + out_time); 	   
			    }   
			    
		}).error(function(error) {
			console.log("Error Occured");
		});
    };

})