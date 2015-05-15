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
});


describe("Remove non-existing/invalid roles", function(){
    it("Remove manager role should fail", function(done) {
        db.removeRole('manager')
            .then(function () {
                assert(false)
                done();
             })
            .catch(function (err) {
                done(err);
            });
    });

    //TODO: Are we allowed to remove same roles multiple times?
    it("Remove guest role (which is already removed) should fail", function(done){
        db.removeRole('guest')
            .then(function() {
                console.log("guest role removed");
                assert(false);
                done();
            })
            .catch(function (err) {
                done(err);
            });
        done();
    });
});


describe("Add user to roles", function(){
    it("Add user thali to admin role", function(done) {
        db.addRole('admin')
            .then(function () {
                return db.addUserToRole("thali","admin");
            })
            .then(function () {
                assert(true);
                done();
            })
            .catch(function () {
                assert(false);
                done();
            });
    });
    it("Add user sam to guest role", function(done){
        db.addRole('guest')
            .then(function() {
                return db.addUserToRole("sam","guest");
            })
            .then(function () {
                assert(true);
                done();
            })
            .catch(function () {
                assert(false);
                done();
            });
    });
});

describe("Add user to invalid role", function(){
    it("User sally should not add to manager(non-existing) role", function(done) {
        db.addRole('admin')
            .then(function () {
                return db.addUserToRole("sally","manager");
            })
            .then(function () {
                assert(false);
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });
});


describe("Remove user from role", function() {
    it("Remove user thali from admin role", function (done) {
        db.addRole('admin')
            .then(function () {
                return db.addUserToRole("thali", "admin");
            })
            .then(function () {
                return db.removeUserFromRole("thali","admin");
            })
            .then(function () {
                assert(true);
                done();
            })
            .catch(function () {
                assert(false);
                done();
            });
    });

    it("Remove invalid user(James) from admin role should fail", function (done) {
        db.addRole('admin')
            .then(function () {
                return db.removeUserFromRole("James","admin");
            })
            .then(function () {
                assert(false);
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });
});

describe("Get role by user", function() {
    it("Role of user thali should be 'admin'", function (done) {
        db.addRole('admin')
            .then(function () {
                return db.addUserToRole("thali", "admin");
            })
            .then(function () {
                return db.getRolesByUser("thali");
            })
            .then(function (roles) {
                assert.equal(roles,'admin');
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });
    //TODO: Review please
    it("Role of user sam shouldn't be be 'admin'", function (done) {
        db.addRole('guest')
            .then(function () {
                return db.addUserToRole("sam", "guest");
            })
            .then(function () {
                return db.getRolesByUser("sam");
            })
            .then(function (roles) {
                if(roles !== 'admin') {
                    assert(true);
                }
                else{
                    assert(false);
                }
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });
});

describe("Get users by role", function() {
    it("Admin role should have one user - thali", function (done) {
        db.addRole('admin')
            .then(function () {
                return db.addUserToRole("thali", "admin");
            })
            .then(function () {
                return db.getUsersByRole("admin");
            })
            .then(function (users) {
                assert.equal(users,'thali');
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

});

