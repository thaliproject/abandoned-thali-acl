var assert = require("assert");
var ThaliAclDb = require('../.');

//Initialize the ACL db
var   db = new ThaliAclDb('acl', { db: require('memdown') });

describe ("Initialize ACL", function(){
    it("Create Thali ACL db", function(done){
        var   db = new ThaliAclDb('acl', { db: require('memdown') });
        done();
    });
});


describe("Add roles", function(){
  it("Add admin role", function(done) {
      db.addRole('admin')
          .then(function () {
              assert(true);
              done();
          })
          .catch(function () {
              assert(false);
              done();
          });
  });
  it("Add guest role", function(done){
  db.addRole('guest')
      .then(function() {
          assert(true);
          done();
      })
      .catch(function () {
          assert(false);
          done();
      });
  });
});

describe("Remove roles", function(){
    it("Remove admin role", function(done) {
        db.removeRole('admin')
            .then(function () {
                assert(true);
                done();
            })
            .catch(function () {
                assert(false);
                done();
            });
    });
    it("Remove guest role", function(done){
        db.removeRole('guest')
            .then(function() {
                assert(true);
                done();
            })
            .catch(function () {
                assert(false);
                done();
            });
    });

    //TODO: Should this test fail, since there is no more guest role?
    it("Remove guest role", function(done){
        db.removeRole('guest')
            .then(function() {
                assert(true);
                done();
            })
            .catch(function () {
                assert(false);
                done();
            });
    });
});
