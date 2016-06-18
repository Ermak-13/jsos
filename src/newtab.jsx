var React = require('react');
var ReactDOM = require('react-dom');

var Widget = require('./widget');
var ConfigurationDialog = require('./configuration_dialog');

ReactDOM.render(
  <Widget
    header="Welcome Widget"
  />,
  document.getElementById('widgets-container')
);

ReactDOM.render(
  <ConfigurationDialog />,
  document.getElementById('configuration-dialogs-container')
);
