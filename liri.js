require("dotenv").config();

var Spotify = require('node-spotify-api');
var moment = require('moment');
var keys = require("./keys.js");
var axios = require("axios");

moment().format();


var spotify = new Spotify(keys.spotify);

//Taking inputs from commandline
var inputs = "";


for (i = 3; i < process.argv.length; i++) {

    if (i > 3 && i < process.argv.length) {
      inputs = inputs + "+" + process.argv[i];
    } else {
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
            break;
        case "do-what-it-says":
            break;
        default:
    }
        
}

function bands(){
    
    axios.get("https://rest.bandsintown.com/artists/" + inputs[1] + "/events?app_id=codingbootcamp").then(
    function(response) {

    console.log("Search results for " + inputs[1] +": ");
    
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
    spotify.search({ type: 'track', query: inputs[1] }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

    for (i = 0; i < data.track.length; i++){
        console.log(data.tracks[i].items);
    }
       
      });
}