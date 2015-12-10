(function () {
//this allows the execution of shell commands from JS
  var exec = require('child_process').exec;
  //used to communicate between main process and renderer process
  var ipcRenderer = require('electron').ipcRenderer;
  var matchingFunctions = require('./matchAlgorithm/matchingAlgorithm.js');
  var fileInfo = matchingFunctions.readFile();
  var listening = true;

  //load audio file only once
  var startCmd = new Audio('./assets/audio/startCmd.wav');
  var failedCmd = new Audio('./assets/audio/failedCmd.wav');

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

      if (transcript === 'Jarvis') {
        //end loop that is listening for prefix
        startCmd.play();
        prefixOrCommandListening('stop', 'start');
      }
      // Removed failedCmd
      // else {
      //   failedCmd.play();
      // }
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

      //check if the user command matched exactly with something in phrases.json
      if (matchObj.guessedPhrase !== 'null' && !matchObj.exact) {
        //if it didn't match, try to guess the command
        var guessCorrectly = confirm("Did you mean \"" + matchObj.guessedPhrase + "\"?");
        //make sure the command is not empty and if the guess was correct
        if (guessCorrectly) {
          console.log("guess correctly");
          //if guess was correct, add the phrase to the json file and execute
          //shell command
          matchingFunctions.addPhrase(matchObj);
          executeShellComand(matchObj.command);

        } else {
          console.log("guess incorrect");
          failedCmd.play();
          //if guess was incorrect, start listening for prefix again
          startListeningForPrefix();
        }
      } else if (matchObj.guessedPhrase !== 'null') {
        console.log("match exact");
        executeShellComand(matchObj.command);

      } else {
        console.log("guess phrase null");
        failedCmd.play();
        startListeningForPrefix();
      }
    };
  }

  //receive event emitted from main process (main.js) to start listening
  ipcRenderer.on('listening', function (event) {
    console.log("Taser is listening!");
    //start listening
    prefixRecognition.start();

  });

  /**
   * @param {string} - shell command.
   */

  var executeShellComand = function (shellCommand) {
    exec(shellCommand, function (error, stdout, stderr) {
      console.log("executed shell command");
      //start prefixRecognition again now that the command has been executed
      startListeningForPrefix();
      //if error throw error - this means the command is not a valid shell command
      if (error) {
        throw new Error(error);
      }

    });
  };

  var startListeningForPrefix = function () {
    prefixOrCommandListening('start', 'stop');
  };

  /*
   * @param {string} - start or stop .
   */

  var prefixOrCommandListening = function (prefixFunc, cmdFunc) {
    commandRecognition.onend = function (event) {
      commandRecognition[cmdFunc]();
    };
    prefixRecognition.onend = function (event) {
      prefixRecognition[prefixFunc]();
    };

    commandRecognition[cmdFunc]();
    prefixRecognition[prefixFunc]();
  };

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

  //we will need to refactor this to react instead of jquery if we use react for front-end
  $('button').on('click', toggleListen);
})();
