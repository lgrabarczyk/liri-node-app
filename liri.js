	require("dotenv").config();
	// function myTweets() {
// Node module imports needed to run the functions
	var fs = require("fs"); //reads and writes files
	var request = require("request");
	var keys = require("./keys.js");
	// console.log("keys", keys);

	// var twitter = require ("twitter");
	var twitter = require("twitter");
	// var spotify = require ("spotify");
	var spotify = require("spotify");
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
	function spotifyMe(){
	console.log("Music for DAYS!");

	//variable for search term, test if defined.

	var searchTrack;
	if(secondCommand === undefined){
		searchTrack = "What's My Age Again?";
	}else{
		searchTrack = secondCommand;
	}
	//launch spotify search
	spotify.search({type:'track', query:searchTrack}, function(err,data){
	    if(err){
	        console.log('Error occurred: ' + err);
	        return;
	    }else{
	        //tried searching for release year! Spotify doesn't return this!
	  		console.log("Artist: " + data.tracks.items[0].artists[0].name);
	        console.log("Song: " + data.tracks.items[0].name);
	        console.log("Album: " + data.tracks.items[0].album.name);
	        console.log("Preview Here: " + data.tracks.items[0].preview_url);
	    }
	});
};//end spotifyMe

function aMovieForMe(){
	console.log("Netflix and Chill?");

	//same as above, test if search term entered
	var searchMovie;
	if(secondCommand === undefined){
		searchMovie = "Mr. Nobody";
	}else{
		searchMovie = secondCommand;
	};

	var url = 'http://www.omdbapi.com/?t=' + searchMovie +'&y=&plot=long&tomatoes=true&r=json';
   	request(url, function(error, response, body){
	    if(!error && response.statusCode == 200){
	        console.log("Title: " + JSON.parse(body)["Title"]);
	        console.log("Year: " + JSON.parse(body)["Year"]);
	        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
	        console.log("Country: " + JSON.parse(body)["Country"]);
	        console.log("Language: " + JSON.parse(body)["Language"]);
	        console.log("Plot: " + JSON.parse(body)["Plot"]);
	        console.log("Actors: " + JSON.parse(body)["Actors"]);
	        console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
	        console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
	    }
    });
};//end aMovieForMe
