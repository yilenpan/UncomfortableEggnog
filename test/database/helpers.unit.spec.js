var expect = require('chai').expect;
var db = require('../../server/db/db');
var helpers = require('../../server/helpers/helpers');


//===== test packages==========
var devPackage = {
  'git push': 'git push origin master',
  'make folder apple': 'mkdir apple'
};
var kylePackage = {
  'protip': "say 'kyle cho pro tip: when in doubt hash it out'",
  'kyle install': 'npm install electron-prebuilt -g'
};
var gitPackage = {
  'protip': "say 'kyle cho pro tip: when in doubt hash it out'",
  'kyle install': 'npm install electron-prebuilt -g'
};
var shellPackage = {
  'protip': "say 'kyle cho pro tip: when in doubt hash it out'",
  'kyle install': 'npm install electron-prebuilt -g'
};

var packages = [kylePackage, gitPackage, shellPackage].map(function (p) {
  var entry = {
    likes: 0,
    dislikes: 0,
    downloads: 0,
    dateCreated: new Date(),
    packageContents: JSON.stringify(p),
    userId: fredId
  };

  return new db.PackageEntry(entry);

});

//====== test users=============
var fred = new db.User({
  username: 'Fred',
  password: '1234'
});


describe('Database helpers', function (done) {
  var fredId;
  beforeEach(function (done) {
    // add user to db
    fred.save(function (err, data) {
      console.log(data);
      fredId = data.id;
    // add package with our user's id to db
      devPackage.userId = fredId;
      devPackage.save(function (err, data) {
        done();
      });
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
  });
  it('should save package', function (done) {
    // create package
    var kylePackage = {
      'protip': "say 'kyle cho pro tip: when in doubt hash it out'",
      'kyle install': 'npm install electron-prebuilt -g'
    };
    var user = 'Fred';
    helpers.savePackage(user, kylePackage, function (err, result) {
      expect(err).to.equal(null);
      // db.PackageEntry.findOne({}, function (err, data) {
      //   expect(err).to.be(null);
      //   expect(data)
      // });
      done();
    });
  });

  it('should retrieve package', function (done) {
    helpers.findPackageByTitle("git-package", function (err, data) {
      // should only findOne
      expect(data).to.be.an('object');
      expect(err).to.equal(null);
      expect(data.title).to.be('git-package');
      done();
    });
  });

  it('should retrieve a user\'s packages', function (done) {
    db.PackageEntry.collection.insert(packages, function (err, data) {
      expect(err).to.equal(null);
      helpers.findPackagesByUser('fred', function (err, data) {
        expect(err).to.equal(null);
        expect(data.length).to.equal(4);
        expect(data[0]).to.have.property('title');
        done();
      });
    });
  });
});
