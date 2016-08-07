var sprintf = require('sprintf-js').sprintf;

var DataManager = {
  loadData: function () {
    if (this._loadData) return this._loadData();

    global.Storage.get(
      this.getDataStorageKey(),
      function (data) {
        if (data) {
          this.setData(data);
        }
      }.bind(this)
    );
  },

  saveData: function () {
    if (this._saveData) return this._saveData();

    global.Storage.set(
      this.getDataStorageKey(),
      this.getData()
    );
  },

  getData: function () {
    if (this._getData) return this._getData();

    return {};
  },

  setData: function (data, callback) {
    if (this._setData) return this._setData(data, callback);

    this.setState(data, callback);
  },

  getDataStorageKey: function () {
    if (this._getDataStorageKey) return this._getDataStorageKey();

    return sprintf(
      global.Settings.get('widget_data_storage_key'),
      { name: this.getName() }
    );
  }
};

module.exports = DataManager;
