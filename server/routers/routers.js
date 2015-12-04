var express = require('express');
var db = require('../db/db.js');
var helpers = require('../helpers/helpers.js');


module.exports = function (isLoggedIn) {

/*************************************
                     User Routes
**************************************/
  var router = new express.Router();

  router.get('/users/:id', function (req, res) {
    var id = req.params.id;
    db.User.findOne( { id: id }, function (err, user) {
        if (err) {
          console.log(err);
        }
        console.log(user);
        res.send(user);
      });
    });

/*************************************
                     Login Routes
**************************************/

  router.get('/', helpers.checkUser, handler.renderIndex);
  router.get('/create', helpers.checkUser, handler.renderIndex);


  router.get('/login', helpers.loginUserForm);
  router.post('/login', helpers.loginUser);

  router.get('/logout', helpers.logoutUser);

  router.get('/signup', helpers.signupUserForm);
  router.post('/signup', helpers.signupUser);

  /*************************************
                       Package Routes
  **************************************/
  router.get('/packages/:id', helpers.checkUser, handler.fetchLinks);
  router.post('/packages', helpers.savePackageEntry);


  //======Default Route=========
  router.get('/*', function (req, res) {
    res.redirect('/');
  });

  return router;
};








    // requestHandler.getUserById(id)
    //   .then(function(data) {
    //     res.status(200).send(data);
    //   .catch(function(err) {
    //     console.error(err);
    //     res.status(404).send(err);
    //   });

// exports.getUserById = function(id) {
//   return db.Users.find({
//       where: { id: id }
//     })
//     .then(function(user) {
//       console.log(user);
//       return user;
//     });
