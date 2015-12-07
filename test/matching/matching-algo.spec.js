// var expect = require('chai').expect;
// var testCases = require('../assets/parse-test');
// var cmdUtil = require('../../match/command-util').commandUtil;
// var matching = require('../../match/command-util').matching;
// var fs = require('fs');
// var _ = require('underscore');


// // TODO: Change when the commands folder is established

// var phrasesPath = __dirname + '/../../match/phrases.json';
// var commandsPath = __dirname + '/../../match/commands.json';
// var commands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));

// var commandsPath = __dirname + '/../../match/commands.json';
// var commands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));

// var fileInfo = {
//   commands: commands,
//   phrasesPath: phrasesPath
// };

// //after testing, revert the phrases back to original
// var revertPhrases = JSON.parse(fs.readFileSync(phrasesPath, 'utf8'));


// describe('Natural language string matching algorithm', function () {

//   it('should match exact phrases', function (done) {
//     var exactMatch = JSON.parse(fs.readFileSync(__dirname + '/../assets/exact-match-test.json', 'utf8'));
//     var exactCommands = _.every(exactMatch, function (input, key) {
//       return (matching(input[0], phrasesPath) === key);
//     });
//     expect(exactCommands).to.equal(true);
//     done();
//   });

//   it('should match phrases with different cases', function (done) {
//     var caseMatch = JSON.parse(fs.readFileSync(__dirname + '/../assets/case-match-test.json', 'utf8'));
//     var caseCommands = _.every(caseMatch, function (input, key) {
//       return (matching(input[0], phrasesPath) === key);
//     });
//     expect(caseCommands).to.equal(true);
//     done();
//   });

//   it('should match similar phrases', function (done) {
//     var closeMatch = JSON.parse(fs.readFileSync(__dirname + '/../assets/close-match-test.json', 'utf8'));
//     var closeCommands = _.every(closeMatch, function (input, key) {
//       return (matching(input[0], phrasesPath) === key);
//     });
//     expect(closeCommands).to.equal(true);
//     fs.writeFileSync(phrasesPath, JSON.stringify(revertPhrases), 'utf8');
//     done();
//   });

//   it('should return null for a bad match', function (done) {
//     var noMatch = JSON.parse(fs.readFileSync(__dirname + '/../assets/no-match-test.json', 'utf8'));
//     var noMatchCommands = _.every(noMatch, function (input, key) {
//       return (matching(input[0], phrasesPath) === null);
//     });
//     expect(noMatchCommands).to.equal(true);
//     done();
//   });

//   it('should add new close-match commands', function (done) {
//     var proTip = {
//       "score": 0.8985846042633057,
//       "term": "call Joe Pro tip"
//     };

//     matching(proTip, phrasesPath);
//     var newPhrases = JSON.parse(fs.readFileSync(phrasesPath, 'utf8'));;

//     expect(_.some(newPhrases["kyle cho pro tip"], function (phrase) {
//       return phrase === "call Joe Pro tip";
//     })).to.equal(true);

//     fs.writeFileSync(phrasesPath, JSON.stringify(revertPhrases), 'utf8');
//     done();
//   });

//   it('should return correct bash shell command', function (done) {
//     var proTip = {
//       "score": 0.9879723424234234,
//       "term": "kyle cho pro tip"
//     };
//     expect(cmdUtil(proTip, fileInfo)).to.equal("say kyle cho pro tip");
//     done();
//   });

// });
