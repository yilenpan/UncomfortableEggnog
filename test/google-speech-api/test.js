// var config = require('./config');
// var speech = require('google-speech-api');


if (!('webkitSpeechRecognition' in window)) {
    //Speech API not supported here…
} else { //Let’s do some cool stuff :)
    function startButton(event) {
      final_transcript = '';
      recognition.start();
      console.log('wat')
    }
  }; 
      var recognition = new webkitSpeechRecognition(); //That is the object that will manage our whole recognition process. 
      recognition.continuous = false;   //Suitable for dictation. 
      recognition.interimResults = true;  //If we want to start receiving results even if they are not final.
      //Define some more additional parameters for the recognition:
      recognition.lang = "en-US"; 
      recognition.maxAlternatives = 1; //Since from our experience, the highest result is really the best...
      alert('hi!');
      recognition.onstart = function() {
      //Listening (capturing voice from audio input) started.
      //This is a good place to give the user visual feedback about that (i.e. flash a red light, etc.)
      console.log('starting to listen!');
  };

  recognition.onend = function() {
    recognition.stop();
      //Again – give the user feedback that you are not listening anymore. If you wish to achieve continuous recognition – you can write a script to start the recognizer again here.
  };

  recognition.onresult = function(event) { //the event holds the results
    var interim_transcript = '';
  //Yay – we have results! Let’s check if they are defined and if final or not:
      if (typeof(event.results) === 'undefined') { //Something is wrong…
          recognition.stop();
          return;
      }

      for (var i = event.resultIndex; i < event.results.length; ++i) {      
          if (event.results[i].isFinal) { //Final results
             final_transcript += event.results[i][0].transcript;
              console.log("final results: " + event.results[i][0].transcript);   //Of course – here is the place to do useful things with the results.
          } else {   //i.e. interim...
             interim_transcript += event.results[i][0].transcript;
              console.log("interim results: " + event.results[i][0].transcript);  //You can use these results to give the user near real time experience.
          }
           final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
      } //end for loop
}
