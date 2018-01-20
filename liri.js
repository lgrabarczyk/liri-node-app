	require("dotenv").config();
	// function myTweets() {
// Node module imports needed to run the functions
	var fs = require("fs"); //reads and writes files
	var request = require("request");
	var keys = require("./keys.js");
	// console.log("keys", keys);

	
	var twitter = require("twitter");
	// var spotify = require ("spotify");
	var liriArgument = process.argv[2];
		var client = new twitter({
			consumer_key: '3oNJke6X0Nl1ogR5jpP7Aqs92',
			consumer_secret: 'nL5eJ1x7BkJb5ZW8RdSEzMnvW9LQpCFswVll3S9V4AbK6oubvx',
			access_token_key: '952991682492067846-PV2oqHXH6nPhLKJeNTLgXGuHf41pD3C',
			access_token_secret: '5f0A02IGG7HWhXTOUPCzKDPoayTPtlpLhi0dmjAh9COLn', 
		});
		var twitterUsername = process.argv[3];
		if(!twitterUsername){
			twitterUsername = "@LeeRutCB";
		}
		params = {screen_name: twitterUsername};
		client.get("statuses/user_timeline/", params, function(error, data, response){
			if (!error) {
				for(var i = 0; i < data.length; i++) {
					//console.log(response); // Show the full response in the terminal
					var twitterResults = 
					"@" + data[i].user.screen_name + ": " + 
					data[i].text + "\r\n" + 
					data[i].created_at + "\r\n" + 
					"------------------------------ " + i + " ------------------------------" + "\r\n";
					console.log(twitterResults);
					log(twitterResults); // calling log function
				}
			}  else {
				console.log("Error :"+ error);
				return;
			}
		});

		function log(logResults) {
	  fs.appendFile("log.txt", logResults, (error) => {
	    if(error) {
	      throw error;
	    }
	  });
	}
