/**
 * parseCommands takes in one object of phrases (key) and bash commands (value), and
 * returns an object with an exact command object and an object that holds commands
 * with parsed arguments and options.
 * ===========
 *  Example functionality
 *  input:
 *  {
 *    "check the": "open https//www.google.com/?gws_rd=ssl#q=<ARG del='+' />",
 *    "open": "open <ARG del='\\ ' capitalize=true/>.app",
 *    "kyle cho pro tip": "say kyle cho pro tip"
 *  }
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
 *    exactCommands:
 *     {
 *       "kyle cho pro tip": "say kyle cho pro tip"
 *     },
 *
 *    argCommands:
 *     {
 *       "check the": {
 *          command: ["open https//www.google.com/?gws_rd=ssl#q="]
 *          delimiter: "+",
 *          args: 1
 *         },
 *        "open": {
 *          command: ["open ", ".app"],
 *          delimiter: "\\ ",
 *          capitalize: true,
 *          args: 1
 *      }
 *    }
 */
var _argSyntax = /<ARG.*\/>/;
//TODO: parse delimiter
var _delSyntax = /del="\s*([^\n\r"]*)"\s* | del='\s*([^\n\r']*)'\s*/;

module.exports = {
  parseCommands: function (commandObj) {
    var exactCommands = {};
    var argCommands = {};


    for (var phrase in commandObj) {
      var bash = commandObj[phrase];
      var args = bash.match(_argSyntax);
      console.log("these are the arguments: " + args);
      //arguments case: add to argCommands object
      if (args) {
        argCommands[phrase] = bash;
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
