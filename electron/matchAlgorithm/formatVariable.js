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
   */

//delimiter syntax: del="..." or del='...'
var _delSyntax = /del="\s*([^\n\r"]*)"\s* | del='\s*([^\n\r']*)'\s*/;
//arg syntax
var _argSyntax = /<ARG.*\/>/;

//test commands object
var commands = {
  exactCommands: {},
  argCommands: {
      "google": "open https//www.google.com/?gws_rd=ssl#q=<ARG del='+' />"
      }
  };

module.exports = function (phrase, variable) {
//test strings
 phrase = "google";
 variable = "name of US president";

  var bash = commands.argCommands[phrase.trim()];
  //extract arg block from bash command and slice the ends ("<ARG" and "/>")
  var argPhraseStr = bash.match(_argSyntax)[0].slice(4, -2).trim();
  //TODO: refactor parseCommands code to
  // handle removing trailing whitespace in between parameters
  var argPhrases = argPhraseStr.split(' ');
  var argParams = {};
  argPhrases.forEach(function (phrase) {
  //Split the phrase into key/value pairs
    var arg = phrase.split('=');
    var key = arg[0];
    var value;
    console.log(arg);
  //if value is wrapped in single quotation marks, remove extraneous quotes.
    if (arg[1][0] === '\'' && arg[1][arg[1].length - 1] === '\'') {
      console.log('wat');
      value = arg[1].slice(1, -1);
  //assign key/value to argument.
      argParams[key] = value;
    } else {
      argParams[key] = JSON.parse(arg[1]);
    }
    console.log(argParams);
  });
  console.log(argParams);
};

//   var args = bash.match(_argSyntax);

//   // var delimiter =
//   if (variable[0] === " ") {
//     variable = variable.substr(1);
//   }
//   //when opening a application, first letter of every word must be capitalized.
//   //spaces must be escapped with "\\
//   if (phrase === 'open') {
//     variable = variable.replace(/\w\S*/g, function (txt) {
//       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//     });
//     variable = variable.replace(/\ /g, "\\ ") + ".app";
//   }

//   //replacing spaces with '+'
//   if (phrase === "check the" || phrase === "Youtube" || phrase === "google") {
//     variable = variable.replace(/\ /g, "\+");
//   }

//   if (phrase === 'Wikipedia') {
//     variable = variable.replace(/\w\S*/g, function (txt) {
//       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//     });
//     variable = variable.replace(/\ /g, "\_");
//   }

//   return variable;
// };

// module.exports = function (phrase, variable) {
//   //remove the first character if it's a space
//   if (variable[0] === " ") {
//     variable = variable.substr(1);
//   }

//   //when opening a application, first letter of every word must be capitalized.
//   //spaces must be escapped with "\\
//   if (phrase === 'open') {
//     variable = variable.replace(/\w\S*/g, function (txt) {
//       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//     });
//     variable = variable.replace(/\ /g, "\\ ") + ".app";
//   }

//   //replacing spaces with '+'
//   if (phrase === "check the" || phrase === "Youtube" || phrase === "google") {
//     variable = variable.replace(/\ /g, "\+");
//   }

//   if (phrase === 'Wikipedia') {
//     variable = variable.replace(/\w\S*/g, function (txt) {
//       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//     });
//     variable = variable.replace(/\ /g, "\_");
//   }

//   return variable;
// };
