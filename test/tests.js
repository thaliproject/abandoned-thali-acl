var assert = require("assert");
var ThaliAclDb = require('../.');

//Initialize the ACL db
var db = new ThaliAclDb('acl', { db: require('memdown') });

describe ("Initialize ACL", function(){
  it("Create Thali ACL db", function(done){
    var db = new ThaliAclDb('acl', { db: require('memdown') });
    done();
  });
});


describe("isAllowed", function(){
  it("User Joy should be allowed to guest role", function(done) {
    db.addRole('guest')
      .then(function () {
        return db.addUserToRole('joy', 'guest');
      })
      .then(function () {
        return db.isAllowed('joy', 'guest');
      })
      .then(function (isAllowed) {
        assert.equal(isAllowed,true);
        done();
      })
      .catch(done);
  });
  it("User Joy should not be allowed to admin role", function(done) {
    db.addRole('admin')
      .then(function () {
        return db.addUserToRole('joy', 'guest');
      })
      .then(function () {
        return db.isAllowed('joy', 'admin');
      })
      .then(function (isAllowed) {
        assert.equal(isAllowed,false);
        done();
      })
      .catch(done);
  });
});

describe("Add roles", function(){
  it("Add admin role", function(done) {
    db.addRole('admin')
      .then(function () { done(); }, done);
  });
  it("Add guest role", function(done){
    db.addRole('guest')
      .then(function() { done(); }, done);
  });
});

describe("Remove roles", function(){
  it("Remove admin role", function(done) {
    db.removeRole('admin')
      .then(function () { done(); }, done);
    });

    it("Remove guest role", function(done){
      db.removeRole('guest')
          .then(function () { done(); }, done);
    });
});

describe("Add user to roles", function(){
  it("Add user thali to admin role", function(done) {
    db.addRole('admin')
      .then(function () {
        return db.addUserToRole("thali","admin");
      })
      .then(function () { done(); }, done);
  });
  it("Add user sam to guest role", function(done){
    db.addRole('guest')
      .then(function() {
        return db.addUserToRole("sam","guest");
      })
      .then(function () { done(); }, done);
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
      });
      .catch(done);
  });
});
