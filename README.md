# LIRI v1.0.0

## Project Goal
LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Link to site
[LIRI v1.0.0](https://github.com/homemadechowder/LIRI)

## Demo GIF

![Demo](/liridemo.gif)

## Sections

1. Axios
    - Bands in Town API
    - OMDB API
2. Node-Spotify-API
3. Do what it says 
4. dotenv


### Axios

Axios was used similar to how ajax was used. The response will output a javascript object and I parsed data from the response object. An example snippet is shown below for bands in town api:

```javascript
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

```

The similar technique was used for OMDB as well.

### Node-Spotify-API

The node spotify api was a bit different from the other APIs, it was prebuild as an npm tool for users to install and use. I followed the example on the documentation page and traversed through its object to parse the items I wanted

### Do what it says:
The do-what-it-says is done by requiring 'fs' and reading the text from a pre-written text file and using the content of the textfile to output a command and a target. I stored the items in the textfile into an array and then called on them individually as inputs for liri.

### dotenv

dotenv was used for reading spotify keys correctly. 

#### Notes

LIRI github page can be accessed from:
https://homemadechowder.github.io/Portfolio/# 
by going into the portfolio section.
