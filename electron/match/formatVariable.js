module.exports = function (voiceCommand, variable) {
  console.log('Inside formatVariable with voiceCommand ', voiceCommand);
  console.log('Inside formatVariable with variable ', variable);
  //remove the first character if it's a space
  if (variable[0] === " ") {
    variable = variable.substr(1);
  }

  //when openning a application, first letter of every word must be capitalized.
  //spaces must be escapped with "\\
  if (voiceCommand === 'open') {
    variable = variable.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    variable = variable.replace(/\ /g, "\\ ") + ".app";
  }

  //replacing spaces with '+'
  if (voiceCommand === "check the" || voiceCommand === "Youtube" || voiceCommand === "google") {
    variable = variable.replace(/\ /g, "\+");
  }

  if (voiceCommand === 'Wikipedia') {
    variable = variable.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    variable = variable.replace(/\ /g, "\_");
  }

  return variable;
};
