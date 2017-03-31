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
 db.createTable('user_todos', {
   id: { type: 'int', primaryKey: true, autoIncrement: true },
   description: 'string',
   completed: 'int',
   userid: 'int'
 }, callback);

};

exports.down = function(db, callback) {
  return null;
};

exports._meta = {
  "version": 1
};
