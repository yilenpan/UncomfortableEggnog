var expect = require('chai').expect;
var db = require('../../server/db/db');
var helpers = require('../../server/helpers/helpers');

xdescribe('something', function (done) {
  beforeEach(function (done) {
    // add users to db
    var fred = new db.User({
      username: 'Fred',
      password: '1234'
    });
    fred.save(function () {

      var devPackage = new db.PackageEntry({
        likes: 5,
        dislikes: 2,
        downloads: 240
      });
      done();
    });
  });
  afterEach(function (done) {
    db.User.remove({}, function (err) {
      db.PackageEntry.remove({}, function (err) {
        done();
      });
    });
  });
  it('should hash password', function (done) {
    // pulls fred out of the db
    db.User.findOne( {
      username: 'Fred'
    }, function (err, user) {
      if (err) {
        console.log(err);
        done();
      } else {
    // expect password to not equal 1234
        expect(user.password).to.not.equal('1234');
        done();
      }
    });
    done();
  });
  it('should save package', function (done) {
    // create package

    done();
  });
  it('should retrieve package', function (done) {
    done();
  });
});
