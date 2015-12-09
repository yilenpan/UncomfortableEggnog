var exec = require('child_process').exec;
module.exports = function (shellCommand) {
  exec(shellCommand, function (error, stdout, stderr) {
    console.log("executed shell command");
    console.log('Stoping commandRecognition');
    if (error) {
      throw new Error(error);
    }
  });
};
