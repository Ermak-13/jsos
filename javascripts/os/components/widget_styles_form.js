var React = require('react'),

    PositionAndSizeForm = require('./position_and_size_form'),
    log = require('../actions/log');

var WidgetStylesForm = React.createClass({
  render: function () {
    log('warning', 'WidgetStylesForm is deprecated');
    return React.createElement(PositionAndSizeForm, this.props);
  }
});

module.exports = WidgetStylesForm;
