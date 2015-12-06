//this allows the execution of shell commands from JS
var exec = require('child_process').exec;
//used to communicate between main process and renderer process
var ipcRenderer = require('electron').ipcRenderer;
var listening = true;

if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  var recognition = new webkitSpeechRecognition();

  //default behavior is always listen so start loop
  recognition.onend = function (event) {
    recognition.start();
  };

  recognition.onresult = function (event) {
    //get the user command
    var userCommand = event.results[0][0].transcript;
    console.log("Command: ", userCommand);

    //execute user command
    //in final product, we have to match this user command to a shell command
    exec(userCommand, function (error, stdout, stderr) {
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
  recognition.start();

});

//function to toggle between keypress shortcut and always listening
var toggleListen = function (event) {
  if (listening) {
    listening = false;
    //register shortcut and stop listening
    ipcRenderer.send('registerShortcut', "true");
    //stop the infinite loop
    recognition.onend = function (event) {
      recognition.stop();
    };
  } else {
    listening = true;
    //start always listening
    ipcRenderer.send('unregisterShortcut', "true");
    //start the infinite loop
    recognition.onend = function (event) {
      recognition.start();
    };
  }
};

//we will need to refactor this to angular instead of jquery if we use angular for front-end
$('button').on('click', toggleListen);


