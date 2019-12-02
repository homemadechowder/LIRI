//var Spotify = require('node-spotify-api');
var moment = require('moment');
moment().format();

require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

