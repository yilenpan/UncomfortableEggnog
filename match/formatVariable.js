module.exports = function (phrase, variable) {
  //remove the first character if it's a space
  if (variable[0] === " ") {
    variable = variable.substr(1);
  }

  //when openning a application, first letter of every word must be capitalized.
  //spaces must be escapped with "\\
  if (phrase === 'open') {
    variable = variable.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    variable = variable.replace(/\ /g, "\\ ") + ".app";
  }

  //replacing spaces with '+'
  if (phrase === "check the" || phrase === "Youtube" || phrase === "google") {
    variable = variable.replace(/\ /g, "\+");
  }

  if (phrase === 'Wikipedia') {
    variable = variable.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    variable = variable.replace(/\ /g, "\_");
  }

  return variable;
};
