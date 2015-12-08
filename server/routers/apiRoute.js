var apiController = require('../controllers/apiController');

module.exports = function (app) {
  app.get('/top10', apiController.topTen);
  app.get('/package/:packageName', apiController.getPackage);
  app.post('/search', apiController.searchTerm);
  // app.post('/add', apiController.addPackage);
  // app.post('/package/:packageName/edit', apiController.editPackage);
};
