var _ = require('underscore'),
    sprintf = require('sprintf-js').sprintf,

    log = require('../actions/log');

var WidgetStylesHelper = {
  getWidgetStyles: function () {
    if (this._getWidgetStyles) return this._getWidgetStyles();

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
  }
};

module.exports = WidgetStylesHelper;
