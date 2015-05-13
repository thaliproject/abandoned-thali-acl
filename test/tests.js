var assert = require("assert");
var ThaliAclDb = require('../.');

describe("Add roles", function(){
  it("admin, guest, member roles", function(done){
    var  db = new ThaliAclDb('acl', { db: require('memdown') });
    db.addRole('admin')
      .then(function() {
        assert(true);
        done();
      })
      .catch(function (err) {
        assert(false);
        done();
      });
  });
});
