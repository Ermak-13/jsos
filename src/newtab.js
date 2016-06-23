var React = require('react'),
    ReactDOM = require('react-dom'),
    OS = require('os'),
    Clock = require('./components/widgets/clock'),
    Calendar = require('./components/widgets/calendar');

ReactDOM.render(
  <Clock.Widget/>,
  document.getElementById('widgets-container')
);

ReactDOM.render(
  <Clock.SettingsDialog />,
  document.getElementById('configuration-dialogs-container')
);
