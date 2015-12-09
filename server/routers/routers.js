var controllers = require('../controllers/controllers.js');
var verifyUser = require('../middleware/middleware').verifyUser;

module.exports = function (router) {

/*************************************
                     Login Routes
**************************************/
  router.post('/login', controllers.loginUser);
  router.post('/signup', controllers.signupUser);

/*************************************
                     User Routes
**************************************/

  router.get('/users/:id', controllers.getUserInfo);


  /*************************************
                       Package Routes
  **************************************/
  router.get('/packages', controllers.fetchPackages);
  router.post('/packages', verifyUser, controllers.savePackageEntry);


  //======Default Route=========
  router.get('/*', function (req, res) {
    res.sendStatus(404);
  });
};
