var apiController = require('../controllers/apiController');

module.exports = function (app) {
  app.get('/top10', apiController.topTen);
  app.get('/package/:packageName', apiController.getPackage);
  app.get('/users/:userName/packages', apiController.getUserPackages);
  app.post('/search', apiController.searchTerm);
  app.post('/package/:packageName/edit', apiController.editPackage);
};
