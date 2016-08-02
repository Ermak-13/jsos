var _ = require('underscore'),
    sprintf = require('sprintf-js').sprintf,

    AppDispatcher = require('../app_dispatcher'),
    Events = require('../events'),

    log = require('../actions/log');

var WidgetHelper = {
  getWidgetStyles: function () {
    var size = this.state.size,
        position = this.state.position,
        defaultStyles = _.clone(this.state.widgetStyles || {});

    if (_.isEmpty(size)) {
      log('error', sprintf('widget - %s size is empty.', this.props.widgetName));
    }

    if (_.isEmpty(position)) {
      log('error', sprintf('widget - %s position is empty.', this.props.widgetName));
    }

    var styles = _.extend(
          defaultStyles, {
            position: 'absolute',
            width: size.width,
            height: size.height
        }),

        xSide = position.xSide,
        ySide = position.ySide;

    styles[xSide] = this.state.position[xSide];
    styles[ySide] = this.state.position[ySide];

    return styles;
  },

  move: function (delta) {
    this.setState({
      position: this.getPositionByDelta(delta)
    });
  },

  handleStartMoving: function (e) {
    e.preventDefault();

    this.setState({
      startMovingX: e.pageX,
      startMovingY: e.pageY
    });

    document.addEventListener('mouseup', this.handleStopMoving);
    document.addEventListener('mousemove', this.handleMoving);
  },

  handleMoving: function (e) {
    var startMovingX = this.state.startMovingX,
        startMovingY = this.state.startMovingY;

    this.setState({
      startMovingX: e.pageX,
      startMovingY: e.pageY,
      position: this.getPositionByDelta({
        x: (e.pageX - startMovingX),
        y: (e.pageY - startMovingY)
      })
    });
  },

  handleStopMoving: function (e) {
    this.setState({
      startMovingX: null,
      startMovingY: null
    }, this.save);

    document.removeEventListener('mousemove', this.handleMoving);
    document.removeEventListener('mouseup', this.handleStopMoving);
  },

  getPositionByDelta: function (delta) {
    var position = _.clone(this.state.position),
        xSide = position.xSide,
        ySide = position.ySide,

        xSideValue = parseInt(position[xSide].split('px')[0]),
        ySideValue = parseInt(position[ySide].split('px')[0]),

        deltaX = (xSide === 'left') ? delta.x : -1 * delta.x,
        deltaY = (ySide === 'top') ? delta.y : -1 * delta.y;

    position[xSide] = xSideValue + deltaX + 'px';
    position[ySide] = ySideValue + deltaY + 'px';

    return position;
  },

  close: function () {
    global.Storage.remove(this.getSettingsStorageKey());
    AppDispatcher.removeWidget(this.props.widgetId);
  },

  openConfigurator: function () {
    var refName = this.props.configuratorRefName,
        ref = this.refs[refName];

    ref.open();
  },

  handleConfigure: function (settings) {
    var setSettings = this.setSettings || this._setSettings;
    setSettings(settings, this.saveSettings);
  },

  init: function () {
    this.load();
    AppDispatcher.initWidget(this);
  },

  load: function () {
    this.loadData();
    this.loadSettings();
  },

  save: function () {
    this.saveData();
    this.saveSettings();
  },

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

  _setData: function (data, callback) {
    this.setState(data, callback);
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

  getDataStorageKey: function () {
    return sprintf(
      global.Settings.get('widget_data_storage_key'),
      { name: this.props.widgetName }
    );
  },

  loadSettings: function () {
    global.Storage.get(
      this.getSettingsStorageKey(),
      function (settings) {
        var setSettings = this.setSettings || this._setSettings;

        if (settings) {
          setSettings(settings);
        }
      }.bind(this)
    );
  },

  _setSettings: function (settings, callback) {
    this.setState(settings, callback);
  },

  saveSettings: function () {
    global.Storage.set(
      this.getSettingsStorageKey(),
      this.getSettings()
    );
  },

  getSettingsStorageKey: function () {
    if (this.props.storageKey) {
      return this.props.storageKey;
    } else {
      return this._getDefaultStorageKey();
    }
  },

  _getDefaultStorageKey: function () {
    return sprintf(
      global.Settings.get('widget_storage_key'),
      { id: this.props.widgetId }
    );
  }
};

module.exports = WidgetHelper;
