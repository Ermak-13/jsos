var React = require('react');
var ReactDOM = require('react-dom');

var Clock = require('./components/widgets/clock');

ReactDOM.render(
  <Clock.Widget
    header="Welcome Widget"
  />,
  document.getElementById('widgets-container')
);

ReactDOM.render(
  <Clock.SettingsDialog />,
  document.getElementById('configuration-dialogs-container')
);
