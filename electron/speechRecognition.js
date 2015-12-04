var exec = require('child_process').exec;

(function (console) {
  console.save = function (data, filename) {
    if (!data) {
      console.error('Console.save: No data');
      return;
    }

    if (!filename) {
      filename = 'console.json';
    }

    for (var i = 0; i < array.length; i++) {
      array[i];
    }

    if (typeof data === "object") {
      data = JSON.stringify(data, undefined, 4);
    }

    var blob = new Blob([data], {type: 'text/json'});
    var e = document.createEvent('MouseEvents');
    var a = document.createElement('a');

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href ].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  };
})(console);
//====Web Speech Audio======//
var phrases = {
  "Say Hello World": [],
  "7805333": [],
  "search google cats and dogs": [],
  "check weather in san francisco": [],
  "shutdown in 30": [],
  "ten times five phrases": []
};

if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  var recognition = new webkitSpeechRecognition();
  recognition.onresult = function (event) {
    var cmd = event.results[0][0].transcript;
    console.log("CMD: ", cmd);

    function puts(error, stdout, stderr) {
      console.log(stdout);
    }

    exec('say "kyle cho pro tip ' + cmd + '"', puts);
    exec(cmd, puts);

    record({
      score: event.results[0][0].confidence,
      term: event.results[0][0].transcript
    });
  };
}
var button = $('button');
var recordPhrase = function (p) {
  return function (event) {
    phrases[p].push(event);
  };
};

var record;

$('#print').on('click', function () {
  // console.save(phrases);
  $('#json').text(JSON.stringify(phrases));
});

button.on('click', function () {
  record = recordPhrase($(this).text());
  recognition.start();
});
