// api/ route
var apiController = require('../controllers/apiController');
var verifyUser = require('../middleware/middleware').verifyUser;
var isLoggedIn = require('../middleware/middleware').isLoggedIn;

module.exports = function (app) {
  app.get('/top10', apiController.topTen);
  app.get('/package/:packageName', isLoggedIn, apiController.getPackage);
  app.post('/package/:id', isLoggedIn, apiController.addReview);
  app.get('/download/:id', apiController.downloadPackage);
  app.get('/users/:userName/packages', apiController.getUserPackages);
  app.post('/search', verifyUser, apiController.searchTerm);
  app.post('/package/:packageName/edit', verifyUser, apiController.editPackage);
  app.get('/package/:packageName/edit', verifyUser, apiController.isUserPackage);
};


