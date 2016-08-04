var sprintf = require('sprintf-js').sprintf;

var DataManager = {
  loadData: function () {
    global.Storage.get(
      this.getDataStorageKey(),
      function (data) {
        if (data) {
          var setData = this.setData  || this._setData;
          setData(data);
        }
      }.bind(this)
    );
  },

  saveData: function () {
    var getData = this.getData || function () {
      return {};
    };

    global.Storage.set(
      this.getDataStorageKey(),
      getData()
    );
  },

  _setData: function (data, callback) {
    this.setState(data, callback);
  },

  getDataStorageKey: function () {
    return sprintf(
      global.Settings.get('widget_data_storage_key'),
      { name: this.props.widgetName }
    );
  }
};

module.exports = DataManager;
