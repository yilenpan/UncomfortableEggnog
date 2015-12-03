var wit = require('node-wit');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var ACCESS_TOKEN = 'Y5TWYIS2VCANGWNE765LXGBLR3Y226YT';

var app = express();
// app.use(bodyParser.json());

console.log("Sending text & audio to Wit.AI!");

app.use(express.static('client'));

// app.get('/', function(req, res) {
//   // wit.captureTextIntent(ACCESS_TOKEN, "Hello world", function (err, res) {
//   //     console.log("Response from Wit for text input: ");
//   //     if (err) console.log("Error: ", err);
//   //     console.log(JSON.stringify(res, null, " "));
//   // });

//   // var stream = fs.createReadStream('../assets/audio/myRecording01.wav');
//   // wit.captureSpeechIntent(ACCESS_TOKEN, stream, "audio/wav", function (err, result) {
//   //     console.log("Response from Wit for audio stream: ");
//   //     if (err) console.log("Error: ", err);
//   //     console.log(JSON.stringify(result, null, " "));
//   //     res.status(200).json(result._text);
//   // });
// });

app.listen(3000);