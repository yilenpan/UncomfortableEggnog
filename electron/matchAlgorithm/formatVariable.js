/**
   * formatVariable
   * ===========
   *
   * Takes an input (command) phrase and variable string.
   * Looks up command in argCommands object and returns the variable
   * with the correct delimiter syntax.
   *
   *  EX: formatVariable('google', 'name of US president') //=> 'name+of+US+president'
   *
* */

//test commands object
var commands = {
  exactCommands: {},
  argCommands: {
    "google": {
      "commands": ["open https//www.google.com/?gws_rd=ssl#q="],
      "args": [{ "del": "+"}]
    }
  }
};

module.exports = function (phrase, variable) {
//test strings
 phrase = "google";
 variable = "name of US president";

  var bash = commands.argCommands[phrase]["commands"][0];
  var argParams = commands.argCommands[phrase]["args"];
  //==translate phrase using argument parameters (assumes delimiter)=======
  var varArr = variable.split(' ');
  console.log(varArr);


  if (argParams['capitalize']) {
    varArr = varArr.map(function (word) {
      return word[0].toUpperCase() + word.slice(1);
    });
  }

  //assume one argument for now.
  variable = varArr.join(argParams[0]['del']);

  return variable;
};



