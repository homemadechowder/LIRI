require("dotenv").config();

var Spotify = require('node-spotify-api');
var moment = require('moment');
var keys = require("./keys.js");
var axios = require("axios");

moment().format();


var spotify = new Spotify(keys.spotify);

//Taking inputs from commandline
var inputs = "";
var print = "";


for (i = 3; i < process.argv.length; i++) {

    if (i > 3 && i < process.argv.length) {
      print = print + " " + process.argv[i];
      inputs = inputs + "+" + process.argv[i];
    } else {
      print += process.argv[i];
      inputs += process.argv[i];
  
    }
}



readInputs();
//Function that reads the inputs
function readInputs(){

    switch (process.argv[2]){
        case "concert-this":
            bands();
            break;
        case "spotify-this-song":
            spotifySearch();
            break;
        case "movie-this":
            movieSearch();
            break;
        case "do-what-it-says":
            break;
        default:
    }
        
}

function bands(){
    
    axios.get("https://rest.bandsintown.com/artists/" + inputs + "/events?app_id=codingbootcamp").then(
    function(response) {

    console.log("Search results for " + print +": ");
    
    //Print out each result
    for (i = 0; i < response.data.length; i++){
        console.log("*********************************************");
        console.log("Venue Name: " + response.data[i].venue.name);
        console.log("Venue Location: " + response.data[i].venue.city +" "+ response.data[i].venue.region);
        console.log("Date: " + response.data[i].datetime);
        console.log("*********************************************");
        console.log("                                             ");
    }

    
  }
);
}

function spotifySearch(){
    
    
    spotify.search({ type: 'track', query: inputs }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    
        
    var tracks = data.tracks.items;
    console.log("Search results for '" + print +"': ");
    for (i = 0; i < tracks.length; i++){
        console.log("*********************************************");
        console.log("Song Name: "+ tracks[i].name);
        console.log("Song by: " +tracks[i].artists[0].name);
        console.log("From Album: " + tracks[i].album.name);
        console.log("Album Release Data: " + tracks[i].album.release_date);
        console.log("Preview URL " + tracks[i].preview_url);
        console.log("*********************************************");
        console.log("                                             ");
    }
       
      });
}

function movieSearch(){
    var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function(response) {
        var movie = response.data;
            
        for (i = 0; i < movie.length; i++){
            // * Title of the movie.
            console.log("Title: " + movie.Title);
            // * Year the movie came out.
            console.log("Release Year: " + response.data.Year);
            // * IMDB Rating of the movie.
            console.log("IMDB Rating: " + movie.Ratings[0].Value);
            // * Rotten Tomatoes Rating of the movie.
            console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
            // * Country where the movie was produced.
            console.log("Country of Production: " + movie.Country);
            // * Language of the movie.
            console.log
            // * Plot of the movie.
            console.log("Plot: " + movie.Plot);
            // * Actors in the movie.
            console.log("Actors: " + movie.Actors);
          
        }
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
}