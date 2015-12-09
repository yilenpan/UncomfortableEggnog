var exec = require('child_process').exec;
var santize = function (str) {
  return str.replace(/[^a-z0-9\s]/gi, '');
};
// sanitze rips out any char not a letter or number or white space
module.exports = function (shellCommand) {
  exec(sanitize(shellCommand), function (error, stdout, stderr) {
    console.log("executed shell command");
    console.log('Stoping commandRecognition');
    if (error) {
      throw new Error(error);
    }
  });
};
