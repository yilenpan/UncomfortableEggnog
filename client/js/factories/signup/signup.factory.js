(function () {
  'use strict';

  angular.module('app')
  .factory('SignUpFactory', SignUpFactory);

  SignUpFactory.$inject = [];

  function SignUpFactory () {
    var services = {
      getPasswordStrength: getPasswordStrength,
      checkPasswordStrength: checkPasswordStrength
    };

    return services;
//found on http://stackoverflow.com/questions/948172/password-strength-meter
    function getPasswordStrength (pass) {
      var score = 0;
      if (!pass) {
        return score;
      }

      // award every unique letter until 5 repetitions
      var letters = {};
      for (var i = 0; i < pass.length; i++) {
          letters[pass[i]] = (letters[pass[i]] || 0) + 1;
          score += 5.0 / letters[pass[i]];
      }

      // bonus points for mixing it up
      var variations = {
          digits: /\d/.test(pass),
          lower: /[a-z]/.test(pass),
          upper: /[A-Z]/.test(pass),
          nonWords: /\W/.test(pass)
      };

      var variationCount = 0;
      for (var check in variations) {
          variationCount += (variations[check] === true) ? 1 : 0;
      }
      score += (variationCount - 1) * 10;
      return parseInt(score);
    }

    function checkPasswordStrength (passScore, str) {
      // var score = getPasswordStrength(pass);
      console.log(str);
      if (str === 'strong') {
        return passScore > 80;
      } else if (str === 'good') {
        return passScore > 60;
      } else if (str === 'weak') {
        return true;
      }
    }
  }
})();
