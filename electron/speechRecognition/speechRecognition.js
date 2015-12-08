//this allows the execution of shell commands from JS
var exec = require('child_process').exec;
//used to communicate between main process and renderer process
var ipcRenderer = require('electron').ipcRenderer;
var matchingFunctions = require('./matchAlgorithm/matchingAlgorithm.js');
var fileInfo = matchingFunctions.readFile();
var listening = true;

if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  //instance that will listen for the prefix
  var prefixRecognition = new webkitSpeechRecognition();
  //instance that will listen for the command
  var commandRecognition = new webkitSpeechRecognition();

  //default behavior is always listen so start loop
  prefixRecognition.onend = function (event) {
    prefixRecognition.start();
  };

  prefixRecognition.onresult = function (event) {
    //get the user command
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;
    console.log(transcript);
    if (transcript === 'hello world') {
      //if transcript matches prefix then stop listening for prefix and start listening for command
      prefixRecognition.stop();
      commandRecognition.start();
      //end loop that is listening for prefix
      prefixRecognition.onend = function (event) {
        prefixRecognition.stop();
      };
    }
  };

  commandRecognition.onresult = function (event) {
    console.log("command listening");

    //the transcript is the user command
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;

    var userCommand = {score: confidence,
      term: transcript};

    //get the shell command using the matching algorithm
    var matchObj = matchingFunctions.cmdUtil(userCommand, fileInfo);

    matchObj = {
      command: "open /Applications/Sublime\\ Text\\ 2.app",
      guessedPhrase: "open sublime",
      exact: true
    };

    if (!matchObj.exact) {
      var guessCorrectly = confirm("Did you mean \"" + matchObj.guessedPhrase + "\"?");

      if (guessCorrectly) {
        //matchingFunctions.addPhrase(matchObj);
        executeShellComand(matchObj.command);

      } else {
        prefixRecognition.start();
        prefixRecognition.onend = function (event) {
          prefixRecognition.start();
        };
      }
    } else {
      executeShellComand(matchObj.command);
    }
  };
}

//receive event emitted from main process (main.js) to start listening
ipcRenderer.on('listening', function (event) {

  console.log("Taser is listening!");
  //start listening
  prefixRecognition.start();

});

//function to toggle between keypress shortcut and always listening
var toggleListen = function (event) {
  if (listening) {
    listening = false;
    //register shortcut and stop listening
    ipcRenderer.send('registerShortcut', "true");
    //stop the infinite loop
    prefixRecognition.onend = function (event) {
      prefixRecognition.stop();
    };
  } else {
    listening = true;
    //start always listening
    ipcRenderer.send('unregisterShortcut', "true");
    //start the infinite loop
    prefixRecognition.onend = function (event) {
      prefixRecognition.start();
    };
  }
};

var executeShellComand = function (shellCommand) {
  exec(shellCommand, function (error, stdout, stderr) {
    console.log("executed shell command");
    if (error) {
      throw new Error(error);
    }
    //start prefixRecognition again now that the command has been executed
    prefixRecognition.start();
    //re-start the loop so that it starts listening again
    prefixRecognition.onend = function (event) {
      prefixRecognition.start();
    };
  });
};

//we will need to refactor this to react instead of jquery if we use react for front-end
$('button').on('click', toggleListen);

