var React = require('react'),
    ReactDOM = require('react-dom'),
    OS = require('os'),
    Clock = require('./components/widgets/clock'),
    Calendar = require('./components/widgets/calendar');

ReactDOM.render(
  <Calendar.Widget/>,
  document.getElementById('widgets-container')
);

ReactDOM.render(
  <OS.DefaultSettingsDialog />,
  document.getElementById('configuration-dialogs-container')
);
