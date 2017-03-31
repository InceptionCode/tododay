'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
 db.addIndex('user_todos', 'userid', 'userid', callback);
 db.addForeignKey('user_todos', 'users', 'user_todos_userid_foreign',
 {
   'userid': 'id'
 }, callback);

};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
