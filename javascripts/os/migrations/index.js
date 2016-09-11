var _ = require('underscore');

var MIGRATIONS_STORAGE_KEY = 'migrations',
    migrations = {
      '1473602087': require('./1473602087_add_panel')
    };

var Migrations = function () {
  this.all = function () {
    return migrations;
  };

  this.execute = function () {
    var _this = this,
        names = _.sortBy(_.keys(migrations), function (name) {
          return parseInt(name, 10);
        });

    global.Storage.get(MIGRATIONS_STORAGE_KEY, function (oldMigrations) {
      var newMigrations = _.filter(names, function (name) {
        return !_.contains(oldMigrations, name.toString());
      });

      _.each(newMigrations, function (name) {
        migrations[name.toString()]();
      });

      global.Storage.set(MIGRATIONS_STORAGE_KEY, names);
    });
  };

  this.run = function () {
    this.execute();
  };
};

module.exports = Migrations;
