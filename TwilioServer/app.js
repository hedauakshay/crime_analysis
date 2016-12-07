var http = require('http');
var express = require('express');
var twilio = require('twilio');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/message', function(req,res){
	console.log(req.body);
	var msgFrom = req.body.From;
	var msgBody = req.body.Body;
	msgBody = msgBody.toUpperCase();
	console.log(msgBody);
	
	var msgBodyArray = msgBody.split(" ");
	var time = msgBodyArray[0];
	var result = time.match("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");
	
	if(msgBody=="ADVICE"){
		res.send(`
			<Response>
				<Message>
					Send [TIME in 24hrs format] [Location]
					eg. Send 12:45 MISSION
					Send LIST to get list of Districts
				</Message>
			</Response>
		`);
	}else if(msgBody=="LIST"){
		res.send(`
			<Response>
				<Message>
					<![CDATA[MISSION]]>
					<![CDATA[PARK]]>
					<![CDATA[CENTRAL]]>
					<![CDATA[RICHMOND]]>
					<![CDATA[SOUTHERN]]>
					<![CDATA[TARAVAL]]>
					<![CDATA[BAYVIEW]]>
					<![CDATA[NORTHERN]]>
					<![CDATA[INGLESIDE]]>
					<![CDATA[TENDERLOIN]]>
				</Message>
			</Response>
		`);
	}else{
	
		if(result){
			request.post(
			    'http://localhost:3000/knowSF',
			    { json: { from: msgFrom ,
			    		  body: msgBody} },
			    function (error, response, body) {
			        if (!error && response.statusCode == 200) {
			            console.log(body);
			        }
			    }
			);
		
		}else{
			res.send(`
					<Response>
						<Message>
							INVALID. Reply with ADVICE for more details.
						</Message>
					</Response>
			`);
		}
		}
	
	
	
});

app.listen(1337);
console.log("Listening on port 1337");