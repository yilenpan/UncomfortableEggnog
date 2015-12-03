var wit = require('node-wit');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var ACCESS_TOKEN = "Y5TWYIS2VCANGWNE765LXGBLR3Y226YT";
var http = require('http');
var ip = "127.0.0.1";
var port = 3000;

var app = express();
app.use(bodyParser.json({limit: "50mb"}));

console.log("Sending text & audio to Wit.AI");

wit.captureTextIntent(ACCESS_TOKEN, "Hello world", function (err, res) {
    console.log("Response from Wit for text input: ");
    if (err) console.log("Error: ", err);
    console.log(JSON.stringify(res, null, " "));
});

var stream = fs.createReadStream('../assets/audio/voicetests-examplerun.wav');
wit.captureSpeechIntent(ACCESS_TOKEN, stream, "audio/wav", function (err, res) {
    console.log("Response from Wit for audio stream: ");
    if (err) console.log("Error: ", err);
    console.log(JSON.stringify(res, null, " "));
});

// var server = http.createServer(function(request, response) {


// });

//server.listen(port, ip);