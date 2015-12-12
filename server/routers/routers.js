var controllers = require('../controllers/controllers.js');
var verifyUser = require('../middleware/middleware').verifyUser;
var isLoggedIn = require('../middleware/middleware').isLoggedIn;

module.exports = function (router, passport) {

/*************************************
                     Login Routes
**************************************/
  router.post('/login', controllers.loginUser);
  router.post('/signup', controllers.signupUser);

/**************************************
                Facebook Routes
***************************************/
  router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
  router.get('/auth/facebook/callback',
     passport.authenticate('facebook', {
         successRedirect : '/',
         failureRedirect : '/'
     }));
/*************************************
                     User Routes
**************************************/

  router.get('/users/:id', controllers.getUserInfo);


  /*************************************
                       Package Routes
  **************************************/
  router.get('/packages', isLoggedIn, controllers.fetchPackages);
  router.post('/packages', verifyUser, controllers.savePackageEntry);


  //======Default Route=========
  router.get('/*', function (req, res) {
    res.sendStatus(404);
  });
};
