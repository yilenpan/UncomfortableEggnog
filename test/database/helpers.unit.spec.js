var expect = require('chai').expect;
var db = require('../../server/db/db');
var helpers = require('../../server/helpers/helpers');


//===== test packages==========

//complete package with contents and other data
var devPackage = {
  title: 'Dev Package',
  likes: 200,
  dislikes: 23,
  downloads: 2053,
  dateCreated: new Date(),
  description: 'all the commands you ever need',
  packageContents: JSON.stringify({
    'git push': 'git push origin master',
    'make folder apple': 'mkdir apple'
  })
};

//package contents to be mapped later
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


//====== test users=============


describe('Database helpers', function (done) {
  var fredId;

  beforeEach(function (done) {
    var fred = new db.User({
      username: 'Fred',
      password: '1234'
    });
    // add user to db
    fred.save(function (err, data) {
      fredId = data.id;
    // add one test package with our test user's id to db
      devPackage.userId = fredId;
      var devPackageEntry = new db.PackageEntry(devPackage);
      devPackageEntry.save(function (err, data) {
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

  it('should retrieve package', function (done) {
    helpers.findPackageByTitle("Dev Package", function (err, data) {
      // should only findOne
      expect(err).to.equal(null);
      expect(data.length).to.equal(1);
      expect(data[0]).to.be.an('object');
      expect(data[0].title).to.equal('Dev Package');
      done();
    });
  });

  it('should hash password', function (done) {
    // pulls fred out of the db
    db.User.findOne( {
      username: 'Fred'
    }, function (err, user) {
      if (err) {
        done();
      } else {
    // expect password to not equal 1234
        expect(user.password).to.not.equal('1234');
        done();
      }
    });
  });
  it('should save package', function (done) {
    var username = 'Fred';
    var entry = {
      title: 'Kyle Cho Pro Tips',
      likes: 0,
      dislikes: 0,
      downloads: 0,
      dateCreated: new Date(),
      packageContents: JSON.stringify(kylePackage)
    };

    helpers.savePackage(username, entry, function (err, result) {
      expect(err).to.equal(null);
      db.PackageEntry.findOne({title: 'Kyle Cho Pro Tips'}, function (err, data) {
        expect(err).to.equal(null);
        expect(data).to.be.an('object');
        expect(data).to.have.property('title');
        done();
      });
    });
  });


  it('should retrieve a user\'s packages', function (done) {
    //populate DB with packages associated with our test user
    helpers.findUserByUsername('Fred', function (err, user) {
      var packages = [kylePackage, gitPackage, shellPackage].map(function (p) {
        var entry = {
          likes: 0,
          dislikes: 0,
          downloads: 0,
          dateCreated: new Date(),
          packageContents: JSON.stringify(p),
          userId: user._id
        };
        return entry;
      });
      db.PackageEntry.collection.insert(packages, function (err, data) {
        expect(err).to.equal(null);
        helpers.findPackagesByUsername('Fred', function (err, data) {
          expect(err).to.equal(null);
          expect(data.length).to.equal(4);
          expect(data[0]).to.have.property('title');
          done();
        });
      });
    });
  });
});
