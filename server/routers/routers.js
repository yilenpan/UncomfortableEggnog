var express = require('express');
var db = require('../db/db.js');

module.exports = function(isLoggedIn) {
  var router = new express.Router();
  
  router.get('/:id', function(req, res) {
    // console.dir(req);
    var id = req.params.id;
    db.User.findOne( { id: id }, function (err, user) {
        if (err) console.log(err);
        console.log(user);
        res.send(user);
      });
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
