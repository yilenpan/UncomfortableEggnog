// api/ route
var apiController = require('../controllers/apiController');
var verifyUser = require('../middleware/middleware').verifyUser;

module.exports = function (app) {
  app.get('/top10', verifyUser, apiController.topTen);
  app.get('/package/:packageName', verifyUser, apiController.getPackage);
  app.get('/users/:userName/packages', apiController.getUserPackages);
  app.post('/search', verifyUser, apiController.searchTerm);
  app.post('/package/:packageName/edit', verifyUser, apiController.editPackage);
  app.get('/package/:packageName/edit', verifyUser, apiController.isUserPackage);
};
