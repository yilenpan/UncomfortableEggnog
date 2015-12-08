// var express = require('express');
var db = require('../db/db.js');
var helpers = require('../helpers/helpers.js');
var controllers = require('../controllers/controllers.js');

module.exports = function (router) {

/*************************************
                     Login Routes
**************************************/
  // TODO: Client side login
  router.post('/login', controllers.loginUser);

  router.get('/logout', controllers.logoutUser);

  // TODO: Client side signup
  // router.get('/signup', controllers.signupUserForm);
  router.post('/signup', controllers.signupUser);

/*************************************
                     User Routes
**************************************/

  router.get('/users/:id', controllers.getUserInfo);


  /*************************************
                       Package Routes
  **************************************/
  router.get('/packages', controllers.fetchPackages);
  router.get('/packages/:id', controllers.fetchPackageById);
  router.post('/packages', /*controllers.checkUser,*/ controllers.savePackageEntry);


  //======Default Route=========
  router.get('/*', function (req, res) {
    res.sendStatus(404);
  });
};
