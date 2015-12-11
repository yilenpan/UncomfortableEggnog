/**
 * parseCommands takes in one object of phrases (key) and bash commands (value), and
 * returns an object with an exact command object and an object that holds commands
 * with parsed arguments and options.
 * ===========
 *  Example functionality
 *  input:
 *   {
 *    "check the": "open https//www.google.com/?gws_rd=ssl#q=<ARG del='+' />",
 *    "open": "open <ARG del='\\ ' capitalize=true/>.app",
 *    "kyle cho pro tip": "say kyle cho pro tip"
 *   }
 *  current output: {
 *    exactCommands:
 *     {
 *       "kyle cho pro tip": "say kyle cho pro tip"
 *     },
 *    argCommands: {
 *      "check the": "open https//www.google.com/?gws_rd=ssl#q=<ARG del='+' />",
 *      "open": "open <ARG del='\\ ' capitalize=true/>.app"
 *    }
 *   }
 *
 *
 * potential future output (for multiple argument positions):
 *   {
 *    "exactCommands":
 *     {
 *       "kyle cho pro tip": "say kyle cho pro tip"
 *     },
 *
 *    "argCommands":
 *     {
 *      "check the": {
 *        "command": ["open https//www.google.com/?gws_rd=ssl#q="],
 *        "args": [{
 *          "delimiter": "+"
 *        }]
 *      },
 *      "open": {
 *        "command": ["open ", ".app"],
 *        "args": [{
 *          "delimiter": "\\ ",
 *          "capitalize": true
 *        }]
 *      }
 *     }
 */
// var _argSyntax = /<ARG.*\/>/;
var _argSyntax =/<ARG\s*[a-zA-Z+='"\s\\]*\/>/;

//TODO: parse delimiter
var _delSyntax = /del="\s*([^\n\r"]*)"\s* | del='\s*([^\n\r']*)'\s*/;

var buildArgParams = function (argStr) {
  var argPhraseStr = argStr.slice(4, -2).trim();
  //TODO: refactor parseCommands code to
  // handle removing trailing whitespace in between parameters
  var argPhrases = argPhraseStr.split(' ');
  var argParams = {};
  argPhrases.forEach(function (phrase) {
  //Split the phrase into key/value pairs
    var arg = phrase.split('=');
    var key = arg[0];
    var value;
  //if value is wrapped in single quotation marks, remove extraneous quotes.
  //may not need this detailed of a test if input is exactly JSON format.
    if (arg[1].length > 1 && arg[1][0] === '\'' && arg[1][arg[1].length - 1] === '\'') {
      value = arg[1].slice(1, -1);
  //assign key/value to argument.
      argParams[key] = value;
    } else {
      argParams[key] = JSON.parse(arg[1]);
    }
  });
  return argParams;
};


module.exports = {
  parseCommands: function (commandObj) {
    var exactCommands = {};
    var argCommands = {};

    for (var phrase in commandObj) {
      var bash = commandObj[phrase];
      var args = bash.match(_argSyntax);
      // console.log(args);

      //arguments case: add to argCommands object
      if (args) {
        var argArr = [];
        args.forEach(function(argStr) {
          var a = buildArgParams(argStr);
          argArr.push(a);
        });

        var bashStrs = bash.split(_argSyntax).filter(function (el) {
          return el !== "";
        });


        argCommands[phrase] = {};
        argCommands[phrase]["command"] = bashStrs;
        argCommands[phrase]["args"] = argArr;
        // addArgCommand(args, )
        // var command = bash.split(/<ARG.*>/);
        // var delimiter = command.match(_delSyntax). ;
      } else {
        exactCommands[phrase] = bash;
      }
    }

    return {
      exactCommands: exactCommands,
      argCommands: argCommands
    };
  }
};
