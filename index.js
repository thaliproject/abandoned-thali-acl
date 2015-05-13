var PouchDB = require('pouchdb');
var Acl = require('node_acl_pouchdb');
var Promise = require('bluebird');

/**
 * Creates a new instance of the ThaliAclDb with a url/file location and options
 * @param {string} name The name of the database else defaults to 'thali_acl'
 * @param {Object} [options] Optional options. See http://pouchdb.com/api.html#create_database
 */
function ThaliAclDb(name, options) {
  name || (name = 'thali_acl');
  var db = new PouchDB(name, options);
  this._acl = new Acl(new Acl.pouchdbBackend(db, 'acl'));
  this._init();
}

ThaliAclDb.prototype._init = function () {
  this._isAllowed = Promise.promisify(this._acl.isAllowed);
  this._allow = Promise.promisify(this._acl.allow);
  this._removeRole = Promise.promisify(this._acl.removeRole);
  this._addUserRoles = Promise.promisify(this._acl.addUserRoles);
  this._removeUserRoles = Promise.promisify(this._acl.removeUserRoles);
  this._userRoles = Promise.promisify(this._acl.userRoles);
  this._roleUsers = Promise.promisify(this._acl.roleUsers);
};

/**
 * Determines whether the user is allowed access to a given resource
 * @param {String} user The user to check whether they have permission to the resource.
 * @param {String} resource The resource to check whether the user has access to.
 * @returns {Promise} a promise which returns true or false depending on whether the user has access
 */
ThaliAclDb.prototype.isAllowed = function (user, resource) {
  return this._isAllowed.call(this._acl, user, resource, '*');
};

/**
 * Adds a role to the ACL database.
 * @param {String} role The role name to add.
 * @returns {Promise} a promise which returns no value on success.
 */
ThaliAclDb.prototype.addRole = function (role) {
  return this._allow.call(this._acl, role, [role], '*');
};

/**
 * Removes a role from the ACL database.
 * @param {String} role The role name to remove.
 * @returns {Promise} a promise which returns no value on success.
 */
ThaliAclDb.prototype.removeRole = function (role) {
  return this._removeRole.call(this._acl, role);
};

/**
 * Adds a user to a given role.
 * @param {String} user The user to add to a role.
 * @param {String} role The role to add the user to.
 * @returns {Promise} a promise which returns no value on success.
 */
ThaliAclDb.prototype.addUserToRole = function (user, role) {
  return this._addUserRoles.call(this._acl, user, [role]);
};

/**
 * Removes a user from a given role.
 * @param {String} user The user to remove from a role.
 * @param {String} role The role to remove the user from.
 * @returns {Promise} a promise which returns no value on success.
 */
ThaliAclDb.prototype.removeUserFromRole = function (user, role) {
  return this._removeUserRoles.call(this._acl, user, [role]);
};

/**
 * Gets the roles for the given user.
 * @param {String} user The user to get the roles for.
 * @returns {Promise} a promise which contains an array of roles.
 */
ThaliAclDb.prototype.getRolesByUser = function (user) {
  return this._userRoles.call(this._acl, user);
};

/**
 * Gets the users for a given role
 * @param {String} role The user role to get the users.
 * @returns {Promise} a promise which contains an array of users for the given role.
 */
ThaliAclDb.prototype.getUsersByRole = function (role) {
  return this._roleUsers.call(this._acl, role);
};

module.exports = ThaliAclDb;
