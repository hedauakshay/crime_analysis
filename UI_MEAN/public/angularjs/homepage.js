//loading the 'login' angularJS module
var home = angular.module('home', []);
//defining the login controller
home.controller('BackEnd', function($scope, $http) {
	
	console.log("sfseF");
	$http({
		method : "GET",
		url : 'http://127.0.0.1:5000/getData'
		}).success(function (data2) {
			//console.log(data);
			console.log(data2);
		})
})/**
 * http://usejsdoc.org/
 */
