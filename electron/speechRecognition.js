//this allows the execution of shell commands from JS
var exec = require('child_process').exec;
//used to communicate between main process and renderer process
var ipcRenderer = require('electron').ipcRenderer;
var listening = true;
var matchingFunctions = require('./matchAlgorithm/matchingAlgorithm.js');

var fileInfo = matchingFunctions.readFile();
// var filePath = fileInfo.commandPath;
// var fileCommands = fileInfo.commands;

if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  var initRecognition = new webkitSpeechRecognition();
  var commandRecognition = new webkitSpeechRecognition();

  //default behavior is always listen so start loop
  initRecognition.onend = function (event) {
    initRecognition.start();
  };

  initRecognition.onresult = function (event) {
    //get the user command
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;
    console.log("transcript: ", transcript);
    if (transcript === 'hello world') {
      console.log("INSIDE IF");
      initRecognition.stop();
      commandRecognition.start();
      initRecognition.onend = function (event) {
        initRecognition.stop();
      };
      commandRecognition.onend = function (event) {
        commandRecognition.start();
      };
    }

  };

  commandRecognition.onresult = function (event) {
    console.log("command listening");
    //get the user command
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;

    var userCommand = {score: confidence,
      term: transcript};

    var command = matchingFunctions.cmdUtil(userCommand, fileInfo);
    console.log("COMMAND: ", command);

    //execute shell command
    exec(command, function (error, stdout, stderr) {
      if (error) {
        throw new Error(error);
      }
      //TODO: depending of user command, do something with stdout
      console.log(stdout);
      //start initRecognition again
      initRecognition.start();
      //make the loop so that it starts listening again
      initRecognition.onend = function (event) {
        initRecognition.start();
      };
      commandRecognition.onend = function (event) {
        commandRecognition.stop();
      };
    });

  };
}

//receive event emitted from main process (main.js) to start listening
ipcRenderer.on('listening', function (event) {

  console.log("Taser is listening!");
  //start listening
  initRecognition.start();

});

//function to toggle between keypress shortcut and always listening
var toggleListen = function (event) {
  if (listening) {
    listening = false;
    //register shortcut and stop listening
    ipcRenderer.send('registerShortcut', "true");
    //stop the infinite loop
    initRecognition.onend = function (event) {
      initRecognition.stop();
    };
  } else {
    listening = true;
    //start always listening
    ipcRenderer.send('unregisterShortcut', "true");
    //start the infinite loop
    initRecognition.onend = function (event) {
      initRecognition.start();
    };
  }
};

//we will need to refactor this to angular instead of jquery if we use angular for front-end
$('button').on('click', toggleListen);


