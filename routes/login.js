/**
 * Routes file for Login
 */
var http = require('http');
var request = require('request');

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

//Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/cmpe239';

var crimeData_ID = [];

global.ary = [];

//Check login - called when '/checklogin' POST call given from AngularJS module in login.ejs
exports.checklogin = function(req,res)
{
	var username, password;
	username = req.param("username");
	password = req.param("password");
	
	var json_responses;
	
	if(username!== ''  && password!== '')
	{
		console.log(username+" "+password);
		if(username === "akshay" && password === "akshay")
		{
			//Assigning the session
			username.toUpperCase();
			req.session.username = username;
			console.log("Session initialized");
			json_responses = {"statusCode" : 200};
			res.send(json_responses);
			request('http://127.0.0.1:5000/getData', function (error, response, body) {
				  if (!error && response.statusCode == 200) {
				    //console.log(body) // Print the body of response.
				    var backData = body;
				    var crime_ID = JSON.parse(backData);
				    for(var i = 0; i<crime_ID.length; i++)
		            {
		                var crime_ID_item = crime_ID[i];
		                crimeData_ID.push(crime_ID_item.id) 
		            }
				    
					MongoClient.connect(url, function (err, db) {
					  if (err) {
					    console.log('Unable to connect to the mongoDB server. Error:', err);
					  } else {
					    //HURRAY!! We are connected. :)
					    console.log('Connection established to', url);
					
					    // do some work here with the database.
					    // Get the documents collection
					    var collection = db.collection('crimedata');
					
					    var mongoRes = [];
					    // Find Collections
					    for (var i = 0; i < crimeData_ID.length; i++) {
						    collection.find({IncidentId: crimeData_ID[i]}).toArray(function (err, result) {
						      if (err) {
						        console.log(err);
						      } else if (result.length) {
						    	//var myJsonStringArray = JSON.stringify(result);
						    	var myJsonString = result[0];
						    	pushToAry("data", myJsonString, crimeData_ID.length);
						    	
						        //console.log('Found:', myJsonString);
						      } else {
						        console.log('No document(s) found with defined "find" criteria!');
						      }
						      //Close connection
						      db.close();
						    });
						}
					    var ary = [];
					    function pushToAry(name, val, count) {
					       console.log('pushToAry:',val)
						   var obj = {};
						   obj[name] = val;
						   global.ary.push(obj);
						   console.log('pushToAry:',ary.length);
						   
							   
						}
					    
					    
					  }
					});
				  }
				})
		}
		else
		{
			json_responses = {"statusCode" : 401};
			res.send(json_responses);
		}
	}
	else
	{
		json_responses = {"statusCode" : 401};
		res.send(json_responses);
	}
};


//Redirects to the homepage
exports.redirectToHomepage = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("homepage",{'username':req.session.username});
	}
	else
	{
		res.redirect('/');
	}
};

//Graph
exports.redirectToGraph = function(req, res)
{
	
	res.render("graph",{'username':req.session.username});		
}

//Pie
exports.redirectToPie = function(req, res)
{
	
	res.render("pie",{'username':req.session.username});		
}

//Safe time
exports.safe_time = function(req, res)
{
	
	res.render("time_safe",{'username':req.session.username});		
}

//Donut
exports.redirectToDonut = function(req, res)
{
	console.log("In index");
	var response = {};
	MongoClient.connect(url, function (err, db){
		console.log("In index-2");
		//var coll_2 = mongo.collection("data2015");
		var collection2 = db.collection('crimedata');
		
		var aggregateQuery = [{$group:{_id:'$DayOfWeek',count:{$sum:1}}}];
		console.log("AggregateQuery: "+ JSON.stringify(aggregateQuery));
		collection2.aggregate(aggregateQuery, function(err, result){
			if (err) {
				console.log("In error");
				response.code = 401;
				callback(null, response);
			}
			var aggregateQuery2 = [{$group:{_id:{day:'$DayOfWeek',category:'$Category'},count:{$sum:1}}},{$sort: {_id: -1}}];
			console.log("AggregateQuery: "+ JSON.stringify(aggregateQuery2));
			collection2.aggregate(aggregateQuery2, function(err, result2){
				if (err) {
					console.log("In error");
					response.code = 401;
					callback(null, response);
				}
				res.render('donut',  { 'username':req.session.username, header: 'homepage', title: 'Homepage', data: JSON.stringify(result), data2: JSON.stringify(result2)});
		   	});
			//res.render('donut',  { 'username':req.session.username, header: 'homepage', title: 'Homepage', data: JSON.stringify(result)});
	   	});
	   });		
}

exports.getRecommendationRes = function(req, res)
{
	var crimeData_ID = [];
	
	res.send(ary);
}

exports.redirectToheatMap = function(req, res)
{
	console.log("In index");
	var response = {};
	MongoClient.connect(url, function (err, db){
		console.log("In index-2");
		//var coll_2 = mongo.collection("data2015");
		var collection = db.collection('crimedata');
		
		var aggregateQuery = [{$group:{_id:{x:'$X',y:'$Y'},count:{$sum:1}}},{$sort: {count: -1}}, {$limit:500}];
		console.log("AggregateQuery: "+ JSON.stringify(aggregateQuery));
		collection.aggregate(aggregateQuery, function(err, result){
			console.log(result);
			if (err) {
				console.log("In error");
				response.code = 401;
				callback(null, response);
			}
			// var output = {'result':result};
			// console.log(JSON.stringify(result));
			res.render('heatMap',  { 'username':req.session.username, header: 'homepage', title: 'Homepage', data: JSON.stringify(result)});
	   	});
	   });
	//res.render("heatMap",{'username':req.session.username});		
}


//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/');
};
