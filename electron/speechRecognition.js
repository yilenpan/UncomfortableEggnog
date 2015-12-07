//this allows the execution of shell commands from JS
var exec = require('child_process').exec;
//used to communicate between main process and renderer process
var ipcRenderer = require('electron').ipcRenderer;
var listening = true;
var matchingFunctions = require('./matchAlgorithm/matchingAlgorithm.js');

var fileInfo = matchingFunctions.readFile();
var filePath = fileInfo.commandPath;
var fileCommands = fileInfo.commands;

if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  var commandRecognition = new webkitSpeechRecognition();

  //default behavior is always listen so start loop
  commandRecognition.onend = function (event) {
    commandRecognition.start();
  };

  commandRecognition.onresult = function (event) {
    //get the user command
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;

    var userCommand = {score: confidence,
      term: transcript};

    var command = matchingFunctions.cmdUtil(userCommand, fileCommands, filePath);
    console.log("COMMAND: ", command);

    //execute shell command
    exec(command, function (error, stdout, stderr) {
      if (error) {
        throw new Error(error);
      }
      //TODO: depending of user command, do something with stdout
      console.log(stdout);
    });

    // shell commands tested to make sure it is possible to do it from JS

    //get the weather test
    // exec('open https://www.google.com/?gws_rd=ssl#q=weather+san+francisco', function (error, stdout, stderr) {
    //   console.log(stdout);
    // });

    // //dim screen to 0%
    // var dim = 'osascript -e \'tell application "System Events" to repeat 50 times\' -e \'key code 107\' -e \'delay 0.1\' -e \'end repeat\'';
    // exec(dim, function (error, stdout, stderr) {
    //   console.log(stdout);
    // });

    // //say kyle cho pro tip
    // exec("say kyle cho pro tip" + userCommand, function (error, stdout, stderr) {
    //   console.log(stdout);
    // });

  };

}

//receive event emitted from main process (main.js) to start listening
ipcRenderer.on('listening', function (event) {

  console.log("Taser is listening!");
  //start listening
  commandRecognition.start();

});

//function to toggle between keypress shortcut and always listening
var toggleListen = function (event) {
  if (listening) {
    listening = false;
    //register shortcut and stop listening
    ipcRenderer.send('registerShortcut', "true");
    //stop the infinite loop
    commandRecognition.onend = function (event) {
      commandRecognition.stop();
    };
  } else {
    listening = true;
    //start always listening
    ipcRenderer.send('unregisterShortcut', "true");
    //start the infinite loop
    commandRecognition.onend = function (event) {
      commandRecognition.start();
    };
  }
};

//we will need to refactor this to angular instead of jquery if we use angular for front-end
$('button').on('click', toggleListen);


