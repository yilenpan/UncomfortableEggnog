var apiController = require('../controllers/apiController');

module.exports = function (app) {
  app.get('/top10', apiController.topTen);
  app.post('/search', apiController.searchTerm);
};
