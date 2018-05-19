require("dotenv").config();
const fs = require("fs");
const request = require("request");
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const keys = require('./keys')


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);






var nodeArgs = process.argv;
var command = process.argv[2];

var name = "";


for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {

        name = name + "+" + nodeArgs[i];

    }

    else {

        name += nodeArgs[i];

    }
}


var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";




if (command === "movie-this"){
    
request(queryUrl, function (error, response, body) {

    
    if (!error && response.statusCode === 200) {

        // console.log(JSON.parse(body));
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Date of release: " + JSON.parse(body).Released);
        console.log("Imdb raiting: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country of production: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
    }
 })
};
//artist -songname -preview link in spotify-album
if (command ==="spotify-this-song"){

    spotify.search({ type: 'track', query: name, limit:'1' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        // function replacer(key, value) {
        //     // Filtering out properties
        //     if (typeof value === 'Artists') {
        //         return value;
        //     }
            
        // }
        
        console.log(JSON.stringify(data, null, 2));
        // console.log(JSON.stringify(data, replacer, 2));

        


        
    });


    
   
}

if (command ==="my-tweets"){
    var params = { screen_name: 'nodejs' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            
            console.log(JSON.stringify(tweets, null, 2));
        }
    });
}

if (command ==="do-what-it-says"){

    fs.readFile("random.txt", "utf-8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        console.log(dataArr[0]);
        console.log(dataArr[1]);



        spotify.search({ type: 'track', query: dataArr[1], limit: '1' }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(JSON.stringify(data, null, 2));

        });

});
};


