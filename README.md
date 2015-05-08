# thali-acl The ACL Library for the Thali Project #

This is the ACL library for the Thali Project.  This provides access to the ACL PouchDB database via the [node_acl_pouchdb](https://github.com/thaliproject/node_acl_pouchdb) project.  

This gives the user the ability to do the following:
- Add roles
- Add users to roles
- Remove roles
- Remove users from roles
- Determine whether the user has a role
- Get a list of roles per user
- Get a list of users per role

Follow [@ThaliProject](https://twitter.com/thaliproject) for updates about this library.

# Installation #

```bash
$ npm install thali-acl
```

# API #

## `ThaliAclDb` creation
 -  [`constructor`](#constructor)

## `ThaliAclDb` members
- [`isAllowed`](#isallowed)
- [`addRole`](#addrole)
- [`removeRole`](#removerole)
- [`addUserToRole`](#addusertorole)
- [`removeUserFromRole`](#removeuserfromrole)
- [`getRolesByUser`](#getrolesbyuser)
- [`getUsersByRole`](#getusersbyrole)

### <a id="constructor"></a>`new ThaliAclDb(name, options)`
<a href="#constructor">#</a>[&#x24C8;]

Creates a new instance of the ThaliAclDb with a url/file location and options

#### Arguments ####
1. `name` *(String)*: The name of the database. If not specified, defaults to 'thali_acl'
2. `options` *(Object)*: The optional configuration options.  See [PouchDB Documentation](http://pouchdb.com/api.html#create_database) for acceptable option values.

#### Example

```js
var ThaliAclDb = require('thali-acl');

var db = new ThaliAclDb('acl', { db: require('memdown') });
```
* * *

### <a id="isallowed"></a>`ThaliAclDb.prototype.isAllowed(user, resource)`
<a href="#isallowed">#</a>[&#x24C8;]

Determines whether the user is allowed access to a given resource.

#### Arguments ####
1. `user` *(String)*: The user to check whether they have permission to the resource.
2. `resource` *(String)*: The resource to check whether the user has access to.

#### Returns ####
A `Promise` which on success returns `true` if the user has access to the given role, else `false`.

#### Example

```js
var ThaliAclDb = require('thali-acl');

var db = new ThaliAclDb('acl', { db: require('memdown') });

db.addRole('guest')
  .then(function () {
    return db.addUserToRole('thali', 'guest');
  })
  .then(function () {
    return db.isAllowed('thali', 'guest');
  })
  .then(function (isAllowed) {
    console.log('thali is allowed: %s', isAllowed)
  })
  .catch(function(err) {
    console.log(err);
  });
// => thali is allowed: true
```
* * *


# LICENSE #

The MIT License (MIT)

Copyright (c) 2015 Microsoft Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
